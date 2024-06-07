import { useState } from 'react';
import {
  Card,
  IconButton,
  Modal,
  CardContent,
  Button,
  Grid,
  Typography,
  Box,
  CardHeader,
  Stack,
} from '@mui/material';
import * as Yup from 'yup';
import { Close, Collections } from '@mui/icons-material';
import { useCustomContext } from '../../contexts/context';
import { Logo } from '../core/logo';
import { Field, Formik } from 'formik';
import { CustomInput } from '../custom/custom-input';

const setorOptions = [
  { value: 'Vendas', label: 'Vendas' },
  { value: 'Logística', label: 'Logística' },
  { value: 'Indústria', label: 'Indústria' }
];

function StepForm() {
  const { dispatch, state } = useCustomContext();

  const handleClose = () => {
    dispatch({ type: 'CHANGE-MODAL', payload: false });
  };

  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 6 - files.length);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      const readerPromises = selectedFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises).then((newPreviews) => {
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      });

      setFieldValue('images', [...files, ...selectedFiles]);  // Adicione esta linha
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <Modal
      open={state.modal.modal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        maxHeight: '100vh'
      }}
    >
      <div style={{
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '40px',
        paddingBottom: '40px',
      }}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={11} md={6}>
            <Card sx={{ maxHeight: '95vh', overflow: 'auto', px: 2, pb: 2 }}>
              <CardHeader
                title={
                  <Stack width='100%' flexDirection='row' justifyContent='center'>
                    <Logo theme='dark' width={200} />
                  </Stack>
                }
                action={
                  <IconButton onClick={handleClose} aria-label="Fechar">
                    <Close />
                  </IconButton>
                } />
              <CardContent>
                <Formik
                  initialValues={{
                    title: '',
                    sector: '',
                    description: '',
                    files: [] as File[]
                  }}
                  validationSchema={Yup.object().shape({
                    title: Yup.string().required('Título é obrigatório'),
                    sector: Yup.string().required('Setor é obrigatório'),
                    description: Yup.string().required('Descrição é obrigatória'),
                    files: Yup.array()
                      .of(
                        Yup.mixed().test('fileSize', 'O arquivo é muito grande', (value) => {
                          if (value) {
                            return (value as File).size <= 1024 * 1024;
                          }
                          return true;
                        })
                      )
                      .max(6, 'Você pode enviar no máximo 6 imagens') // Limite de arquivos
                  })}
                  onSubmit={async (values) => {
                    console.log(values);
                  }}
                >
                  {({ handleSubmit, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                          <Field
                            component={CustomInput}
                            name="title"
                            label="Título do problema"
                            type="text"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            component={CustomInput}
                            name="sector"
                            label="Setor"
                            select
                            fullWidth
                            variant="outlined"
                            SelectProps={{
                              native: true,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              sx: { backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' },
                            }}
                          >
                            <option value="" label="Selecione o setor" />
                            {setorOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            component={CustomInput}
                            name="description"
                            label="Descrição do problema"
                            multiline
                            rows={6}
                            InputProps={{
                              sx: { backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="text"
                            component="label"
                            fullWidth
                            sx={{ height: 60, justifyContent: 'flex-start', borderColor: 'transparent', bgcolor: '#f3f3fa' }}
                            startIcon={<Collections />}
                          >
                            Anexar imagens
                            <input
                              type="file"
                              hidden
                              onChange={(event) => {
                                handleFileChange(event, setFieldValue);
                                setFieldValue('files', Array.from(event.target.files || []));
                              }}
                              multiple
                              accept="image/*"
                            />
                          </Button>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: 2 }}>
                            {imagePreviews.map((preview, index) => (
                              <Box key={index} sx={{ position: 'relative', width: '70px', height: '70px' }}>
                                <img src={preview} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />
                                <IconButton
                                  sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                                  }}
                                  onClick={() => handleRemoveImage(index)}
                                >
                                  <Close />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>
                          {files.length > 0 && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {files.length} {files.length === 1 ? 'imagem' : 'imagens'} selecionada(s)
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Stack flexDirection='row' justifyContent='space-between'>
                          <Button
                            onClick={handleClose}
                            sx={{
                              height: 48,
                              width: '45%',
                              color: 'black',
                              borderColor: 'transparent',
                            }}
                            variant="contained"
                            color='secondary'
                          >
                            Cancelar
                          </Button>
                          <Button
                            sx={{
                              height: 48,
                              width: '45%',
                            }}
                            variant="contained"
                            color="primary"
                            type='submit'
                          >
                            Solicitar resolução
                          </Button>
                        </Stack>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid >
      </div>
    </Modal>
  );
}

export default StepForm;

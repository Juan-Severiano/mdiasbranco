import { useState } from 'react';
import { Card, CardHeader, IconButton, Modal, CardContent, CardActions, Button, Grid, Typography, Box, InputAdornment, Chip } from '@mui/material';
import * as Yup from 'yup';
import { Close, Collections, Email } from '@mui/icons-material';
import { useCustomContext } from '../../contexts/context';
import { Logo } from '../core/logo';
import { Field, Formik } from 'formik';
import { CustomInput, PasswordInput } from '../custom/custom-input';

const setor = [
  { value: 'Tecnologia', label: 'Tecnologia' },
  { value: 'Industria', label: 'Indústria' },
  { value: 'Vendas', label: 'Vendas' }
];

function StepForm() {
  const { dispatch, state } = useCustomContext();

  const handleClose = () => {
    dispatch({ type: 'CHANGE-MODAL', payload: false });
  };

  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleKeywordInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keywordInput.trim() !== '') {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 10 - files.length); // Limit to 10 files
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
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} md={6}>
        <Modal
          open={state.modal.modal}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card sx={{ width: '100%', maxWidth: { md: '600px' }, maxHeight: '90vh', overflow: 'auto', px: 2, borderRadius: 2, boxShadow: 3, pb: 2 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4, mt: -2 }}>
                <Logo width={200} theme='dark' />
              </Box>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  title: '',
                  sector: '',
                  keywords: '',
                  description: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
                  password: Yup.string()
                    .required('Senha é obrigatória')
                    .min(6, 'A senha deve ter no mínimo 6 caracteres')
                    .max(12, 'A senha deve ter no máximo 12 caracteres'),
                  title: Yup.string().required('Título é obrigatório'),
                  sector: Yup.string().required('Setor é obrigatório'),
                  description: Yup.string().required('Descrição é obrigatória')
                })}
                onSubmit={async (values) => {
                }}
              >
                {({ errors, handleSubmit, isSubmitting }) => (
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
                          {setor.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          component={CustomInput}
                          name="keywords"
                          label="Palavras chaves"
                          type="text"
                          value={keywordInput}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setKeywordInput(event.target.value)}
                          onKeyDown={handleKeywordInputKeyDown}
                          InputProps={{
                            sx: { backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {keywords.map((keyword, index) => (
                          <Chip
                            key={index}
                            label={keyword}
                            onDelete={() => setKeywords(keywords.filter((_, i) => i !== index))}
                            sx={{ m: 0.5 }}
                          />
                        ))}
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          component={CustomInput}
                          name="description"
                          label="Descrição do problema"
                          multiline
                          rows={4}
                          InputProps={{
                            sx: { backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>Anexar imagens</Typography>
                        <Field
                          component={CustomInput}
                          name="images"
                          type="file"
                          onChange={handleFileChange}
                          multiple
                          accept="image/*"
                          InputProps={{
                            sx: { display: 'none' },
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          sx={{ height: 60, justifyContent: 'flex-start', borderColor: 'transparent' }}
                          startIcon={<Collections />}
                        >
                          Upload
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                          />
                        </Button>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: 2 }}>
                          {imagePreviews.map((preview, index) => (
                            <Box key={index} sx={{ position: 'relative', width: '100px', height: '100px' }}>
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
                  </form>
                )}
              </Formik>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', gap: 2, px: 2 }}>
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
              >
                Solicitar resolução
              </Button>
            </CardActions>
          </Card>
        </Modal>
      </Grid>
    </Grid >
  );
}

export default StepForm;

import { useState } from 'react';
import { Card, CardHeader, IconButton, Modal, CardContent, CardActions, Button, Grid, FormControl, InputLabel, Input, Select, MenuItem, Chip, Typography, Box } from '@mui/material';
import { Close, Collections } from '@mui/icons-material';
import { useCustomContext } from '../../contexts/context';
import { Logo } from '../core/logo';

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
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleKeywordInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keywordInput.trim() !== '') {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
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
                <Logo width={200} />
              </Box>
              <form>
                <Grid container spacing={1.5}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'text.primary' }}>Título do problema</InputLabel>
                      <Input
                        name="name_user"
                        disableUnderline
                        sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'text.primary' }}>Setor</InputLabel>
                      <Select
                        id="problem"
                        label="Setor"
                        disableUnderline
                        sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
                      >
                        {setor.map(problem => (
                          <MenuItem key={problem.value} value={problem.value}>{problem.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'text.primary' }}>Palavras chaves</InputLabel>
                      <Input
                        name="keywords"
                        value={keywordInput}
                        onChange={(event) => setKeywordInput(event.target.value)}
                        onKeyDown={handleKeywordInputKeyDown}
                        disableUnderline
                        sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
                      />
                    </FormControl>
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
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>Anexar imagem</Typography>
                    <FormControl fullWidth>
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
                        />
                      </Button>
                      {imagePreview && (
                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '1rem' }} />
                      )}
                      {file && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {file.name}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'text.primary' }}>Descrição do problema</InputLabel>
                      <Input
                        name="description"
                        multiline
                        rows={4}
                        disableUnderline
                        sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
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
    </Grid>
  );
}

export default StepForm;

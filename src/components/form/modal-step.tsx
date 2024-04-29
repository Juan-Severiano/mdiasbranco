// StepForm.tsx
import { useState } from 'react';
import { Card, CardHeader, IconButton, Modal, CardContent, CardActions, Button, Grid, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Chip } from '@mui/material';
import { Close } from '@mui/icons-material'
import { useCustomContext } from '../../contexts/context';

const setor = [
  { value: 'Tecnologia', label: 'Tecnologia' },
  { value: 'Industria', label: 'Industria' },
  { value: 'Vendas', label: 'Vendas' }
];

function StepForm() {
  const { dispatch, state } = useCustomContext()


  const handleClose = () => {
    dispatch({ type: 'CHANGE-MODAL', payload: false })
    // location.reload()
  }

  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState<string>('');

  const handleKeywordInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keywordInput.trim() !== '') {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  return (

    <Grid container justifyContent='center'>
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
          <Card sx={{ maxWidth: { md: '50vw' } }}>
            <CardHeader sx={{ textTransform: 'uppercase', fontWeight: 900 }} title="Criar um Problema" action={
              <IconButton onClick={handleClose} aria-label="Fechar">
                <Close />
              </IconButton>
            } />
            <CardContent>
              <div>
                <form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>TÍtulo</InputLabel>
                        <OutlinedInput name='name_user' label="TÍtulo" type="text" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>
                          Setor
                        </InputLabel>
                        <Select
                          id="problem"
                          fullWidth
                          variant="outlined"
                          label="Setor"
                        >
                          {
                            setor.map(problem => <MenuItem value={problem.value}>{problem.label}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Descrição</InputLabel>
                        <OutlinedInput name='telephone' label="Descrição" type="tel" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {/* Your existing FormControl for keywords */}
                      <FormControl fullWidth>
                        <InputLabel>Palavras Chaves</InputLabel>
                        <OutlinedInput
                          name='keywords'
                          label="Palavras Chave"
                          type="text"
                          value={keywordInput}
                          onChange={(event) => setKeywordInput(event.target.value)}
                          onKeyDown={handleKeywordInputKeyDown}
                        />
                      </FormControl>
                    </Grid>
                    {/* Display added keywords */}
                    <Grid item xs={12}>
                      {keywords.map((keyword, index) => (
                        <Chip key={index} label={keyword} onDelete={() => setKeywords(keywords.filter((_, i) => i !== index))} />
                      ))}
                    </Grid>
                  </Grid>
                </form>
              </div>
            </CardContent>
            <CardActions>
              <Button fullWidth sx={{ height: 60 }} variant='contained'>Finalizar</Button>
            </CardActions>
          </Card>
        </Modal >
      </Grid>
    </Grid>
  );
}

export default StepForm;

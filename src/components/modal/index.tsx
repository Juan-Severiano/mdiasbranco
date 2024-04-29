import { Card, CardHeader, IconButton, Modal, CardContent, CardActions, Button, Grid, Typography, Paper, Avatar, Divider, Stack, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import { Circle, Close } from '@mui/icons-material'
import { useCustomContext } from '../../contexts/context';

const setor = [
  { value: 'CoffeeStack', label: 'CoffeeStack' },
  { value: 'Lovel', label: 'Lovel' },
  { value: 'MedFlow', label: 'MedFlow' },
  { value: 'Suri', label: 'Suri' },
  { value: 'Straloo', label: 'Straloo' },
];

function ModalProblem() {
  const { dispatch, state } = useCustomContext()

  const handleClose = () => {
    dispatch({ type: 'CHANGE-MODAL-DETAILS', payload: false })
    location.reload()
  };

  return (
    <Modal
      open={state.modalDetails.modal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ overflowY: 'auto', maxHeight: '90vh' }}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader sx={{ textTransform: 'uppercase', fontWeight: 900 }} title="Automatizar a ação de embalar pacotes" action={
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <Stack flexDirection='row' alignItems='center'>
                      <Typography fontWeight={700} fontSize={12}>Status</Typography>
                      <Circle color='success' />
                    </Stack>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleClose} aria-label="Fechar">
                      <Close />
                    </IconButton>
                  </Grid>
                </Grid>
              } />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>
                      Na M Dias Branco, embalar pacotes é um trabalho importante, mas também manual e demorado. Automatizar esse processo pode ajudar muito. Isso significa usar máquinas para embalar os produtos de forma rápida e precisa. Isso economiza tempo e dinheiro, além de garantir que cada pacote seja embalado corretamente. Com a automação, a empresa pode produzir mais, economizar recursos e garantir que seus produtos cheguem aos clientes com qualidade. É um passo importante para tornar a M Dias Branco mais eficiente e competitiva no mercado.
                    </Typography>
                  </Grid>
                  <Grid item container xs={6}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>
                          Startup
                        </InputLabel>
                        <Select
                          id="problem"
                          fullWidth
                          variant="outlined"
                          label="Startup"
                        >
                          {
                            setor.map(problem => <MenuItem value={problem.value}><Avatar sx={{ mr: 2 }}
                              src='https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/04/attachment_78090804-e1492455618692.png'
                            />{problem.label}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Feedback</InputLabel>
                        <OutlinedInput name='name_user' label="Feedback" type="text" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                          <Button variant='outlined'>Enviar</Button>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid item xs={12}>
                    <Paper style={{ padding: "20px 20px" }}>
                      <Grid container wrap="nowrap" spacing={2}>
                        <Paper style={{ padding: "20px 20px" }}>
                          <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                              <Avatar />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                              <h4 style={{ margin: 0, textAlign: "left" }}>Isaac Alves</h4>
                              <p style={{ textAlign: "left" }}>
                                Como poderiamos fazer isso?
                              </p>
                              <p style={{ textAlign: "left", color: "gray" }}>
                                posted 1 minute ago
                              </p>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button fullWidth sx={{ height: 60 }} variant='contained'>Finalizar</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}

export default ModalProblem;

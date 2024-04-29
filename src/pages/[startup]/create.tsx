import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";

export default function CreateStartup() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lg: {
        px: 4
      }
    }}>
      <Grid container alignItems='center'>
        <Grid item sm={12} md={7}>
          <Typography variant="h1" fontWeight={800} textTransform='uppercase' color='white'>cadastre a sua</Typography>
          <Typography variant="h1" fontWeight={500} textTransform='uppercase' color='white'>startup na nossa base de dados</Typography>
          <a href="https://mdiasbranco.com.br" target="_blank">
            <Button color="secondary" sx={{ color: '#000', mt: 3, border: 1, borderColor: '#0B2B70' }} variant="contained">Acessar o site</Button>
          </a>
        </Grid>
        <Grid container item sm={12} md={5} spacing={1}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Nome da Startup</InputLabel>
              <TextField sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} variant="outlined" label="Nome da Startup" name='name_user' type="text" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Razão Social</InputLabel>
              <OutlinedInput sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} name='email_user' label="Razão Social" type="email" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='flex-start'
              alignItems='center'
              sx={{
                border: '2px solid #AEB9D0',
                height: 30,
                width: '100%',
                cursor: 'pointer',
                borderRadius: 1,
                borderColor: '#0B2B70',
                padding: 4,
                bgcolor: '#fff',
                color: '#000',
              }}
              onClick={() => document.querySelector<HTMLInputElement>('.file-field')!.click()}
            >
              <input
                type="file"
                className='file-field'
                hidden accept='image/*'
                placeholder="Logo"
              />
              <Typography>Anexe sua logo</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>CNPJ</InputLabel>
              <OutlinedInput sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} name='name_user' label="CNPJ" type="text" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Instagram</InputLabel>
              <OutlinedInput sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} name='mat_user' label="Instagram" type="text" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Linkedin</InputLabel>
              <OutlinedInput sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} name='sector' label="Linkedin" type="text" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Website</InputLabel>
              <TextField sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} variant="outlined" label="Website" name='sector' type="text" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>E-mail</InputLabel>
              <TextField sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} variant="outlined" label="E-mail" name='sector' type="text" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Setor</InputLabel>
              <TextField sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} variant="outlined" label="Setor" name='sector' type="text" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Serviço</InputLabel>
              <TextField sx={{
                bgcolor: '#fff',
                color: '#000',
                borderRadius: 1,
                borderColor: '#0B2B70'
              }} variant="outlined" label="Serviço" name='sector' type="text" />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

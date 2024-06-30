import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput, Typography } from "@mui/material";

export default function CreateStartup() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 4,
      bgcolor: '#0B2B70'
    }}>
      <Grid container alignItems='center' spacing={2}>
        <Grid item sm={12} md={7}>
          <Typography variant="h1" fontWeight={800} textTransform='uppercase' color='white'>cadastre a sua</Typography>
          <Typography variant="h1" fontWeight={500} textTransform='uppercase' color='white'>startup na nossa base de dados</Typography>
          <a href="https://mdiasbranco.com.br" target="_blank" rel="noopener noreferrer">
            <Button color="secondary" sx={{ color: '#000', mt: 3, border: 1, borderColor: '#0B2B70' }} variant="contained">Acessar o site</Button>
          </a>
        </Grid>
        <Grid container item sm={12} md={5} spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="name_user">Nome da Startup</InputLabel>
              <OutlinedInput
                id="name_user"
                name='name_user'
                type="text"
                label="Nome da Startup"
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="razao_social">Razão Social</InputLabel>
              <OutlinedInput
                id="razao_social"
                name='razao_social'
                type="text"
                label='Razão Social'
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              sx={{
                border: '2px solid #AEB9D0',
                height: 56,
                width: '100%',
                cursor: 'pointer',
                borderRadius: 1,
                padding: 1,
                bgcolor: '#fff',
                textAlign: 'center'
              }}
              onClick={() => document.querySelector<HTMLInputElement>('.file-field')!.click()}
            >
              <input
                type="file"
                className='file-field'
                hidden accept='image/*'
              />
              <Typography color="#AEB9D0">Anexe sua logo</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="cnpj">CNPJ</InputLabel>
              <OutlinedInput
                id="cnpj"
                name='cnpj'
                type="text"
                label="CNPJ"
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="instagram">Instagram</InputLabel>
              <OutlinedInput
                id="instagram"
                name='instagram'
                type="text"
                label="Instagram"
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="linkedin">Linkedin</InputLabel>
              <OutlinedInput
                id="linkedin"
                name='linkedin'
                type="text"
                label="Linkedin"
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="website">Website</InputLabel>
              <OutlinedInput
                id="website"
                name='website'
                type="text"
                label="Website"
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="email">E-mail</InputLabel>
              <OutlinedInput
                id="email"
                name='email'
                type="email"
                label="E-mail"
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="setor">Setor</InputLabel>
              <OutlinedInput
                id="setor"
                name='setor'
                type="text"
                label="Setor"
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="servico">Serviço</InputLabel>
              <OutlinedInput
                id="servico"
                name='servico'
                type="text"
                label="Serviço"
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 1,
                  borderColor: '#0B2B70',
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{
              bgcolor: '#fff',
              color: '#000',
              borderRadius: 1,
              mt: 2,
              px: 2,
              py: 1,
              fontSize: '0.875rem',
              border: '1px solid #0B2B70'
            }}>Enviar</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

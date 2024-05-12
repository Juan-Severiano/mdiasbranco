import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Divider, Grid, Stack, Typography, paperClasses, useMediaQuery } from '@mui/material';
import LoginForm from './input-form';
import { Logo } from '../../../components/core/logo';

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card sx={{
      backgroundColor: theme.palette.common.white,
      minHeight: '50vh',
      [`&.${paperClasses.elevation1}`]: {
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 5px 22px 0 rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(255, 255, 255, 0.12)'
            : '0 5px 22px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)',
      },
    }}>
      <Grid container direction="column" justifyContent="flex-end">
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 168px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Box>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo theme='dark' width={200} />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.primary.main} gutterBottom variant='subtitle1' fontWeight={700} fontSize={22}>
                            Olá, seja bem-vindo de volta
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <LoginForm />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/auth/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Não tem uma conta? Cadastre-se
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Login; 
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Typography } from '@mui/material';
import LoginForm from './input-form';
import { Logo } from '../../../components/core/logo';
import { StyledLink } from '../../../styles/theme/components/styled-link';

const Login = () => {
  const theme = useTheme();

  return (
    <Card sx={{
      my: 'auto',
      mx: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      p: 3,
      py: 6,
      px: 5,
      maxWidth: { xs: '100%', sm: '400px' },
      boxShadow: theme.shadows[3],
    }}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Link to="#">
              <Logo theme='dark' width={200} />
            </Link>
          </Grid>
          <Grid item xs={12}>
            <LoginForm />
          </Grid>
          <Grid item xs={12}>
            <StyledLink to="/auth/register">
              <Typography variant="subtitle1" fontSize={14} sx={{ textDecoration: 'none !important', textAlign: 'center !important' }}>
                Não tem uma conta? Cadastre-se
              </Typography>
            </StyledLink>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default Login;

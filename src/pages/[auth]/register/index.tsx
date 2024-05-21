import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Typography } from '@mui/material';
import { Logo } from '../../../components/core/logo';
import { StyledLink } from '../../../styles/theme/components/styled-link';
import RegisterForm from './input-form';

const Register = () => {
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
      maxWidth: { xs: '100%', sm: '400px' },
      boxShadow: theme.shadows[3],
    }}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Link to="#">
              <Logo theme='dark' width={150} />
            </Link>
          </Grid>
          <Grid item xs={12}>
            <RegisterForm />
          </Grid>
          <Grid item xs={12}>
            <StyledLink to="/auth/login">
              <Typography variant="subtitle1" fontSize={14} sx={{ textDecoration: 'none !important', textAlign: 'center !important' }}>
                Já tem uma conta? Entre
              </Typography>
            </StyledLink>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default Register; 
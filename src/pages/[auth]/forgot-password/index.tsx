import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Typography } from '@mui/material';
import { Logo } from '../../../components/core/logo';
import ForgotForm from './forgot-form';

const ForgotPassword = () => {
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
            <Typography variant="subtitle1" color='primary' fontSize={14}>
              Coloque seu e-mail para a verificação
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ForgotForm />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ForgotPassword;

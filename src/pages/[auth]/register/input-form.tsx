import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Grid
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { RotatingLines } from 'react-loader-spinner'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useCustomContext } from '../../../contexts/context';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../../services/requests/auth';

const LoginForm = ({ ...others }) => {
  const theme = useTheme()
  const { dispatch } = useCustomContext()
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate()

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          telphone: '',
          mat: '',
          sector: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
          password: Yup.string()
            .required('Senha é obrigatória')
            .min(6, 'A senha  deve ter no mínimo 6 caracteres')
            .max(12, 'A senha  deve ter no máximo 12 caracteres'),
          name: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Nome Completo é obrigatório'),
          telphone: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Telefone é obrigatório'),
          sector: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Setor é obrigatório'),
          mat: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Matrícula é obrigatório'),
        })}
        onSubmit={async function (values, { setErrors }) {
          const response = await registerRequest(values);
          console.log(response);
          if (response.error) {
            setErrors({ submit: 'Erro ao fazer login. Verifique suas credenciais.' })
            return
          } else if (response.message === 'Sucesso ao realizar o Login.!') {
            dispatch({
              type: 'SIGN_IN', payload: {
                user: response.data.user,
                access: response.data.token
              }
            });
            setSuccess(true)
            setTimeout(() => {
              navigate('/manager/home');
            }, 1000)
            return
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} >
                <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.body1, mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-name-login">Nome Completo</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name-login"
                    type="text"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Nome Completo"
                    inputProps={{}}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="standard-weight-helper-text-name-login">
                      {errors.name}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.body1, mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.mat && errors.mat)} sx={{ ...theme.typography.body1, mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-mat-login">Matrícula</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-mat-login"
                    type="text"
                    value={values.mat}
                    name="mat"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Matrícula"
                    inputProps={{}}
                  />
                  {touched.mat && errors.mat && (
                    <FormHelperText error id="standard-weight-helper-text-mat-login">
                      {errors.mat}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.telphone && errors.telphone)} sx={{ ...theme.typography.body1, mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-telphone-login">Telefone</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-telphone-login"
                    type="tel"
                    value={values.telphone}
                    name="telphone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Telefone"
                    inputProps={{}}
                  />
                  {touched.telphone && errors.telphone && (
                    <FormHelperText error id="standard-weight-helper-text-telphone-login">
                      {errors.telphone}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.sector && errors.sector)} sx={{ ...theme.typography.body1, mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-sector-login">Setor</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-sector-login"
                    type="text"
                    value={values.sector}
                    name="sector"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Setor"
                    inputProps={{}}
                  />
                  {touched.sector && errors.sector && (
                    <FormHelperText error id="standard-weight-helper-text-sector-login">
                      {errors.sector}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.body1 }}>
                  <InputLabel htmlFor="outlined-adornment-password-login">Senha</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={(event) => { event.preventDefault() }}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Senha"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            {errors.submit && (
              <Alert color="error" sx={{ mt: 2 }}>
                {errors.submit}
              </Alert>
            )}
            {success && (
              <Alert color="success" sx={{ mt: 2 }}>
                Login efetuado com sucesso, redirecionando
              </Alert>
            )}
            <Box sx={{ mt: 5 }}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                {isSubmitting ?
                  <>
                    <RotatingLines width='20' strokeColor='#b2cbdc' /> Carregando ...
                  </>
                  : 'Registrar'}
              </Button>
            </Box>
          </form>
        )}
      </Formik >
    </>
  );
};

export default LoginForm;

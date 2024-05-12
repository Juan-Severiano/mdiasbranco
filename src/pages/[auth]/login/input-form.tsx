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
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { RotatingLines } from 'react-loader-spinner'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useCustomContext } from '../../../contexts/context';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../../services/requests/auth';

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
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
          password: Yup.string()
            .required('Senha é obrigatória')
            .min(6, 'A senha  deve ter no mínimo 6 caracteres')
            .max(12, 'A senha  deve ter no máximo 12 caracteres')
        })}
        onSubmit={async function (values, { setErrors }) {
          const response = await loginRequest(values);
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
            {errors.submit && (
              <Alert color="error" sx={{ mt: 2 }}>
                { errors.submit }
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
                  : 'Entrar'}
              </Button>
            </Box>
          </form>
        )}
      </Formik >
    </>
  );
};

export default LoginForm;

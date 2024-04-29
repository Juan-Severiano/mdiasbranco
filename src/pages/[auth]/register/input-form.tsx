import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useCustomContext } from '../../../contexts/context';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

// ============================|| FIREBASE - LOGIN ||============================ //

interface PasswordConfig {
  minLength: number;
  minLowercase: number;
  minNumbers: number;
  minSymbols: number;
  minUppercase: number;
}

const LoginForm = ({ ...others }) => {
  const theme = useTheme()
  const { dispatch } = useCustomContext()
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (  
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          registration:'',
          sector: '',
          password: '',
          telephone: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
          password: Yup.string()
            .required('Senha é obrigatória')
            .test(
              'is-strong-password',
              'Senha não é forte o suficiente',
              (value: string | undefined) => {
                if (!value) return false;
                const config: PasswordConfig = {
                  minLength: 8,
                  minLowercase: 1,
                  minNumbers: 1,
                  minSymbols: 1,
                  minUppercase: 1
                };
                const lowercaseRegex = /[a-z]/;
                const uppercaseRegex = /[A-Z]/;
                const numbersRegex = /[0-9]/;
                const symbolsRegex = /[@$!%*?&]/;

                if (value !== undefined) {
                  return (
                    value.length >= config.minLength && value.match(lowercaseRegex)?.length >= config.minLowercase &&
                    value.match(uppercaseRegex)?.length >= config.minUppercase &&
                    value.match(numbersRegex)?.length >= config.minNumbers &&
                    value.match(symbolsRegex)?.length >= config.minSymbols
                  );
                }
              }
            )
        })}
        onSubmit={async (values) => {
          console.log(values)
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>

            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.body1, mb: 2 }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Nome Completo</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Name"
                inputProps={{}}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>

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

            <FormControl fullWidth error={Boolean(touched.registration && errors.registration)} sx={{ ...theme.typography.body1, mb: 2 }}>
              <InputLabel >Matricula</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.registration}
                name="registration"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Registration"
                inputProps={{}}
              />
              {touched.registration && errors.registration && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.registration}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.telephone && errors.telephone)} sx={{ ...theme.typography.body1, mb: 2 }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Telefone</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.telephone}
                name="telephone"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Telephone"
                inputProps={{}}
              />
              {touched.telephone && errors.telephone && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.telephone}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.sector && errors.sector)} sx={{ ...theme.typography.body1, mb: 2 }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Setor</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.sector}
                name="sector"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Sector"
                inputProps={{}}
              />
              {touched.sector && errors.sector && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.sector}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.sector && errors.sector)} sx={{ ...theme.typography.body1, mb: 2 }}>
              {/* dps devo trocar o nome senha */}
              <InputLabel htmlFor="outlined-adornment-email-login">Senha</InputLabel> 
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.sector}
                name="sector"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Sector"
                inputProps={{}}
              />
              {touched.sector && errors.sector && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.sector}
                </FormHelperText>
              )}
            </FormControl>


            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.body1 }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Repetir senha</InputLabel>
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
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            {errorLogin && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errorLogin}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 5 }}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Entrar
              </Button>
            </Box>
          </form>
        )}
      </Formik >
    </>
  );
};

export default LoginForm;
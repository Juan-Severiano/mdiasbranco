import React, { useState } from 'react';
import { Alert, Box, Button, InputAdornment, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { RotatingLines } from 'react-loader-spinner';
import { useCustomContext } from '../../../contexts/context';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../../services/requests/auth';
import { PasswordInput, CustomInput } from '../../../components/custom/custom-input';
import { Email } from '@mui/icons-material';
import { StyledLink } from '../../../styles/theme/components/styled-link';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginForm: React.FC = () => {
  const { dispatch } = useCustomContext();
  const [success, setSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRecaptchaChange = (token: string | null) => {
    if (token !== null) {
      setRecaptchaToken(token);
    }
  };

  return (
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
          .min(6, 'A senha deve ter no mínimo 6 caracteres')
      })}
      onSubmit={async (values, { setErrors }) => {
        if (!recaptchaToken) {
          setErrors({ submit: 'Por favor, marque o ReCAPTCHA' });
          return;
        }

        const response = await loginRequest(values);
        console.log(response);
        if (response.error) {
          setErrors({ submit: 'Erro ao fazer login. Verifique suas credenciais.' });
          return;
        } else if (response.message === 'Sucesso ao realizar o Login.!') {
          dispatch({
            type: 'SIGN_IN', payload: {
              user: response.data.user,
              access: response.data.token
            }
          });
          setSuccess(true);
          setTimeout(() => {
            navigate('/manager/home');
          }, 1000);
          return;
        }
      }}
    > 
      {({ errors, handleSubmit, isSubmitting }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Field
            component={CustomInput}
            name="email"
            label="Email"
            type="email"
            startAdornment={
              <InputAdornment position="start"><Email /></InputAdornment>
            }
          />
          <Field
            component={PasswordInput}
            name="password"
            label="Senha"
          />
          <ReCAPTCHA
            sitekey="6LcwpuUpAAAAADb1QSb6SqvS-Md1R2GvPi0SPAhZ"
            onChange={handleRecaptchaChange}
          />
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontSize={14} sx={{ textDecoration: 'none !important', textAlign: 'end !important' }}>
              <StyledLink to="/auth/forget-password" >
                Esqueceu a senha?
              </StyledLink>
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
              {isSubmitting ?
                <>
                  <RotatingLines width="20" strokeColor="#b2cbdc" /> Carregando...
                </>
                : 'Entrar'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { Alert, Box, Button, InputAdornment } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { RotatingLines } from 'react-loader-spinner';
import { forgetPasswordSolicitation } from '../../../services/requests/auth';
import { CustomInput } from '../../../components/custom/custom-input';
import { Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

const ForgotForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  function handleCancel() {
    navigate('/auth/login')
  }

  return (
    <Formik
      initialValues={{
        email: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
      })}
      onSubmit={async (values, { setErrors }) => {
        try {
          const response = await forgetPasswordSolicitation(values);
          console.log(response);
          setSuccess(true);
        } catch (error) {
          console.log(error)
          if (isAxiosError(error)) {
            if (error?.response) {
              setErrors({ submit: error.response.data.message });
              return;
            }
          }
        } finally {
          setTimeout(() => {
            setSuccess(false)
          }, 1500)
        }
      }}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Field
            component={CustomInput}
            name="email"
            label="Email para recuperação"
            type="email"
            startAdornment={
              <InputAdornment position="start"><Email /></InputAdornment>
            }
          />
          {errors.submit && (
            <Alert color="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
          )}
          {
            success && (
              <Alert color="success" sx={{ mt: 2 }}>
                Email de verificação enviado, por favor cheque sua caixa de entrada ;)
              </Alert>
            )
          }
          <Box sx={{ mt: 2 }}>
            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
              {isSubmitting ?
                <>
                  <RotatingLines width="20" strokeColor="#b2cbdc" /> Carregando...
                </>
                : 'Enviar'}
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button fullWidth size="large" color='error' variant="contained" onClick={handleCancel}>
              Cancelar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ForgotForm;

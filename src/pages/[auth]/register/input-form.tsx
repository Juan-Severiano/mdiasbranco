import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  Grid,
  MenuItem
} from '@mui/material';

import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../../services/requests/auth';
import { Sector } from '../../../types/problem';
import { isAxiosError } from 'axios';
import { CustomInput, PasswordInput } from '../../../components/custom/custom-input';
import { AddIcCall, Assignment, Email, PermContactCalendar } from '@mui/icons-material';
import { UserCircle } from '@phosphor-icons/react';
import CustomSelect from '../../../styles/theme/custom-select';

const RegisterForm = ({ ...others }) => {
  const theme = useTheme()
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatPassword: '',
          name: '',
          telphone: '',
          mat: '',
          sector: Sector.SECTOR,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
          password: Yup.string()
            .required('Senha é obrigatória')
            .min(6, 'A senha  deve ter no mínimo 6 caracteres'),
          name: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Nome Completo é obrigatório'),
          telphone: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Telefone é obrigatório'),
          sector: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Setor é obrigatório'),
          mat: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Matrícula é obrigatório'),
          repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'As senhas devem corresponder')
            .required('Repetir senha é obrigatório'),
        })}
        onSubmit={async function (values, { setErrors }) {
          try {
            const response = await registerRequest(values);
            console.log(response);
            if (response) {
              setSuccess(true)
              setTimeout(() => {
                navigate('/auth/login');
              }, 1000)
              return
            }
          } catch (error) {
            if (isAxiosError(error)) {
              if (error.response) {
                setErrors({ submit: error.response.data.message })
              }
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Field
                  component={CustomInput}
                  name="name"
                  label="Nome Completo"
                  type="text"
                  startAdornment={
                    <InputAdornment position="start"><UserCircle size={22} /></InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={CustomInput}
                  name="email"
                  label="Email"
                  type="email"
                  startAdornment={
                    <InputAdornment position="start"><Email /></InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <Field
                  component={CustomInput}
                  name="mat"
                  label="Matrícula"
                  type="text"
                  startAdornment={
                    <InputAdornment position="start"><PermContactCalendar /></InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Field
                  component={CustomInput}
                  name="telphone"
                  label="Telefone"
                  type="tel"
                  startAdornment={
                    <InputAdornment position="start"><AddIcCall /></InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(touched.sector && errors.sector)} sx={{ ...theme.typography.body1, mb: 1 }}>
                  <CustomSelect
                    value={values.sector}
                    name="sector"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Setor'
                    startAdornment={
                      <InputAdornment position="start"><Assignment /></InputAdornment>
                    }
                  >
                    {Object.values(Sector).map(sector => (
                      <MenuItem key={sector} value={sector}>
                        {sector}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  {touched.sector && errors.sector && (
                    <FormHelperText error id="standard-weight-helper-text-sector-login">
                      {errors.sector}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={PasswordInput}
                  name="password"
                  label="Senha"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={PasswordInput}
                  name="repeatPassword"
                  label="Repetir Senha"
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Alert color="error" sx={{ mt: 2 }}>
                {errors.submit}
              </Alert>
            )}
            {success && (
              <Alert color="success" sx={{ mt: 2 }}>
                Usuário registrado, faça login
              </Alert>
            )}
            <Box sx={{ mt: 3 }}>
              <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
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

export default RegisterForm;

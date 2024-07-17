import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import { Alert, Box, FormHelperText, InputAdornment, MenuItem, useTheme } from '@mui/material';
import { localClient } from '../../lib/local/client';
import { optionalSchema } from '../../schema/user';
import { Field, Formik } from 'formik';
import { Sector } from '../../types/problem';
import { isAxiosError } from 'axios';
import { UserCircle } from '@phosphor-icons/react';
import { CustomInput } from '../custom/custom-input';
import { AddIcCall, Assignment, Email, PermContactCalendar } from '@mui/icons-material';
import CustomSelect from '../../styles/theme/custom-select';
import { RotatingLines } from 'react-loader-spinner';
import { patchUser } from '../../services/requests/auth';

export function AccountDetails(): React.JSX.Element {
  const { data } = localClient.getUser()
  const theme = useTheme()
  const [success] = React.useState(false);

  return (
    <Card>
      <CardHeader subheader="As informações podem ser editadas" title="Informações" />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{
            ...data,
            submit: null
          }}
          validationSchema={optionalSchema}
          onSubmit={async function (values, { setErrors }) {
            try {
              const response = await patchUser(values, data.id);
              localClient.addUser(response)
              location.reload()
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
            <form noValidate onSubmit={handleSubmit}>
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
                    : 'Atualizar'}
                </Button>
              </Box>
            </form>
          )}
        </Formik >
      </CardContent>
    </Card>
  );
}

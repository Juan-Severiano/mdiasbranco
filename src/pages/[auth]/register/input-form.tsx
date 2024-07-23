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
  MenuItem,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { Field, Formik } from 'formik';
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../../services/requests/auth';
import { Sector } from '../../../types/problem';
import { isAxiosError } from 'axios';
import { CustomInput, PasswordInput } from '../../../components/custom/custom-input';
import { AddIcCall, Assignment, Close, Email, PermContactCalendar } from '@mui/icons-material';
import { User, UserCircle } from '@phosphor-icons/react';
import CustomSelect from '../../../styles/theme/custom-select';
import { registerSchema } from '../../../schema/user';

const RegisterForm = ({ ...others }) => {
  const theme = useTheme()
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 1 - files.length);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      const readerPromises = selectedFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises).then((newPreviews) => {
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      });

      setFieldValue('files', [...files, ...selectedFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

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
          files: [] as File[],
          sector: Sector.ADMINISTRATION,
          submit: null,
        }}
        validationSchema={registerSchema}
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  variant="text"
                  component="label"
                  fullWidth
                  sx={{ height: 60, justifyContent: 'flex-start', borderColor: 'transparent', bgcolor: '#f3f3fa', color: '#D7D8DF' }}
                  startIcon={<User color='gray' />}
                >
                  <Stack flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'>
                    <Typography fontSize='inherit' color='GrayText'>Foto de perfil </Typography>{imagePreviews.map((preview, index) => (
                      <Box key={index} sx={{ position: 'relative', width: '50px', height: '50px' }}>
                        <img src={preview} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            width: 20, height: 20
                          }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Close fontSize='small' />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                  <input
                    type="file"
                    hidden
                    onChange={(event) => {
                      handleFileChange(event, setFieldValue);
                      setFieldValue('files', Array.from(event.target.files || []));
                    }}
                    multiple
                    accept="image/*"
                  />
                </Button>
              </Grid>
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
              <Grid item xs={12} md={6}>
                <Field
                  component={PasswordInput}
                  name="password"
                  label="Senha"
                />
              </Grid>
              <Grid item xs={12} md={6}>
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

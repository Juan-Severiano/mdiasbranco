// @ts-nocheck
import React, { useState } from 'react';
import { Alert, Box, Button, FormControl, FormHelperText, Grid, InputAdornment, InputProps, MenuItem, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { startupSchemaObject } from '../../schema/startup';
import DynamicInput from '../../components/core/dynamic-input';
import { Logo } from '../../components/core/logo';
import CustomSelect from '../../styles/theme/custom-select';
import { Assignment } from '@mui/icons-material';
import { Sector } from '../../types/problem';
import { createStartup } from '../../services/requests/startup';
import InputMask from 'react-input-mask';
import { JSX } from 'react/jsx-runtime';
import CustomOutlinedInput from '../../styles/theme/custom-outlined-input';

type FormValues = {
  [key: string]: string | File[];
};

const CreateStartup: React.FC = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const initialValues: FormValues = startupSchemaObject.reduce((acc, field) => {
    acc[field.name] = field.name === 'attachment' ? [] : '';
    return acc;
  }, {} as FormValues);

  const theme = useTheme();

  const validationSchema = Yup.object().shape(
    startupSchemaObject.reduce((acc, field) => {
      if (field.name === 'attachment') {
        acc[field.name] = Yup.array().of(
          Yup.mixed().test('fileSize', 'O arquivo é muito grande', (value) => {
            if (value) {
              return (value as File).size <= 1024 * 1024;
            }
            return true;
          })
        ).max(2, 'Você pode enviar no máximo 2 arquivos');
      } else {
        acc[field.name] = Yup.string().required(`${field.label} é obrigatório`);
      }
      return acc;
    }, {} as any)
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setAttachments(filesArray);

      // Generate preview for the first file
      if (filesArray.length > 0) {
        const file = filesArray[0];
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Clean up URL object when component unmounts
        return () => URL.revokeObjectURL(objectUrl);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'absolute', top: 10 }}>
            <Logo width={200} />
          </Box>
          <Typography sx={{ md: { mt: 20 } }} variant="h1" fontWeight={800} textTransform="uppercase" color="white">
            Cadastre a sua
          </Typography>
          <Typography variant="h1" fontWeight={500} textTransform="uppercase" color="white">
            Startup na nossa base de dados
          </Typography>
          <a href="https://mdiasbranco.com.br" target="_blank" rel="noopener noreferrer">
            <Button color="secondary" sx={{ color: '#000', mt: 3, border: 1, borderColor: '#0B2B70' }} variant="contained">
              Acessar o site
            </Button>
          </a>
          {success && (
            <Alert color="success" sx={{ mt: 2 }}>
              Sua startup foi cadastrada com sucesso, muito obrigado pela colaboração !
            </Alert>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values: FormValues, { resetForm }) => {
              const formData = new FormData();
              for (const key in values) {
                if (key === 'attachment') {
                  attachments.forEach((file, _) => {
                    formData.append(`attachment`, file);
                  });
                } else {
                  formData.append(key, values[key] as string);
                }
              }
              try {
                await createStartup(formData)
                setSuccess(true)
                setTimeout(() => {
                  setSuccess(false)
                }, 2000)
                resetForm(startupSchemaObject.reduce((acc, field) => {
                  acc[field.name] = field.name === 'attachment' ? [] : '';
                  return acc;
                }, {} as FormValues))
              } catch (error) {
                console.log(error)
              }
            }}
          >
            {({ handleSubmit, isSubmitting, touched, errors, values, handleBlur, handleChange }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  {startupSchemaObject.map((field) => (
                    <Grid item xs={field.name === 'linkedin' || field.name === 'website' || field.name === 'sector' || field.name === 'service' ? 6 : 12} key={field.name}>
                      {field.name === 'attachment' ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            border: '2px solid #AEB9D0',
                            height: 50,
                            width: '100%',
                            cursor: 'pointer',
                            borderRadius: 1,
                            padding: 3,
                            bgcolor: '#fff',
                            textAlign: 'center',
                          }}
                          onClick={() => document.querySelector<HTMLInputElement>('.file-field')!.click()}
                        >
                          <input type="file" className="file-field" hidden accept="image/*" multiple onChange={handleFileChange} />
                          <Typography color="#AEB9D0">Anexe sua logo</Typography>
                          {preview && (
                            <img src={preview} alt="Preview" style={{ marginLeft: 'auto', width: 50, height: 50, objectFit: 'contain' }} />
                          )}
                        </Box>
                      ) : field.name === 'cnpj' ? (
                        <FormControl fullWidth error={Boolean(touched.cnpj && errors.cnpj)} sx={{ ...theme.typography.body1, mt: 2 }}>
                          <InputMask
                            mask="99.999.999/9999-99"
                            value={values.cnpj as any}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="cnpj"
                          >
                            {
                            (inputProps: any) => (
                              <CustomOutlinedInput
                                {...inputProps}
                                placeholder="CNPJ"
                                type="text"
                                sx={{ width: '100%' }}
                              />
                            )}
                          </InputMask>
                          {touched.cnpj && errors.cnpj ? (
                            <FormHelperText>{errors.cnpj}</FormHelperText>
                          ) : null}
                        </FormControl>
                      ) : field.options ? (
                        <FormControl fullWidth error={Boolean(touched.sector && errors.sector)} sx={{ ...theme.typography.body1, mt: 2 }}>
                          <CustomSelect
                            value={values.sector as string}
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
                        </FormControl>
                      ) : (
                        <DynamicInput
                          name={field.name}
                          label={field.label}
                          type={field.type}
                          startAdornment={field.name === 'email' ? <InputAdornment position="start">@</InputAdornment> : undefined}
                          sx={{ width: '100%' }}
                        />
                      )}
                    </Grid>
                  ))}
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' color='secondary' sx={{ color: '#0B2B70', mt: 4, border: 1, borderColor: '#0B2B70' }} fullWidth type="submit" disabled={isSubmitting}>
                      {
                        isSubmitting ? 'Criando ...' : 'Criar'
                      }
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  )
};

export default CreateStartup;

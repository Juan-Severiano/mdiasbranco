// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Card, FormControl, FormHelperText, Grid, InputAdornment, InputProps, MenuItem, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { startupEditSchema, startupSchemaObject } from '../../../schema/startup';
import DynamicInput from '../../../components/core/dynamic-input';
import CustomSelect from '../../../styles/theme/custom-select';
import { Assignment } from '@mui/icons-material';
import { Sector } from '../../../types/problem';
import { createStartup, getStartupById, patchStartup } from '../../../services/requests/startup';
import InputMask from 'react-input-mask';
import CustomOutlinedInput from '../../../styles/theme/custom-outlined-input';
import { isAxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

type FormValues = {
  [key: string]: string | File[] | null;
};

const ManagerCreateStartup: React.FC = () => {
  const { id } = useParams()
  const [attachments, setAttachments] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [initial, setInitial] = useState<FormValues | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInitialData = async () => {
      const res = await getStartupById(id!);
      const initialValues: FormValues = startupSchemaObject.reduce((acc, field) => {
        acc[field?.name] = res[field?.name] ?? '';
        return acc;
      }, {} as FormValues);
      setInitial(initialValues);
    };
    if (id) {
      fetchInitialData();
    }
  }, [id]);

  const theme = useTheme();

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
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
      {initial ? (
        <Formik
          initialValues={{ ...initial, submit: null }}
          validationSchema={startupEditSchema}
          onSubmit={async (values: FormValues, { resetForm, setErrors }) => {
            try {
              await patchStartup(values, id!)
              setSuccess(true)
              navigate('/manager/startup')
              setTimeout(() => {
                setSuccess(false)
              }, 2000)
              resetForm(startupSchemaObject.reduce((acc, field) => {
                acc[field.name] = field.name === 'attachment' ? [] : '';
                return acc;
              }, {} as FormValues))
            } catch (error) {
              console.log(error.response.data)
              if (isAxiosError(error)) setErrors({ submit: error.response.data.message as string })
            }
          }}
        >
          {({ handleSubmit, isSubmitting, touched, errors, values, handleBlur, handleChange }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                {startupSchemaObject.map((field) => (
                  <Grid item xs={field.name === 'linkedin' || field.name === 'website' || field.name === 'sector' || field.name === 'service' ? 6 : 12} key={field.name}>
                    {field.name === 'attachment' ? null : field.name === 'cnpj' ? (
                      <FormControl fullWidth error={Boolean(touched.cnpj && errors.cnpj)} sx={{ ...theme.typography.body1, mt: 2 }}>
                        <InputMask
                          mask="99.999.999/9999-99"
                          value={values.cnpj as any}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="cnpj"
                        >
                          {(inputProps: InputProps) => (
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

                ))
                }
                {errors.submit && (
                  <Alert color="error" sx={{ mt: 2, width: '100%' }}>
                    {errors.submit}
                  </Alert>
                )}
                {success && (
                  <Alert color="success" sx={{ mt: 2 }}>
                    Sua startup foi cadastrada com sucesso, muito obrigado pela colaboração !
                  </Alert>
                )}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant='contained' color='secondary' sx={{ color: '#0B2B70', mt: 4, border: 1, borderColor: '#0B2B70' }} fullWidth type="submit" disabled={isSubmitting}>
                    {
                      isSubmitting ? 'Editando ...' : 'Editar'
                    }
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>) : null}
    </Card>
  )
};

export default ManagerCreateStartup;

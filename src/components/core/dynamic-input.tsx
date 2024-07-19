import React from 'react';
import { Field } from 'formik';
import { FormControl, InputLabel } from '@mui/material';
import CustomOutlinedInput from '../../styles/theme/custom-outlined-input';

interface DynamicInputProps {
  name: string;
  label: string;
  type?: string;
  startAdornment?: React.ReactNode;
  sx?: any;  // Adiciona suporte para sx
}

const DynamicInput: React.FC<DynamicInputProps> = ({ name, label, type = 'text', startAdornment, sx }) => (
  <Field name={name}>
    {({ field, meta }: any) => (
      <FormControl fullWidth variant="outlined" margin="normal" sx={sx}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <CustomOutlinedInput
          {...field}
          id={name}
          type={type}
          label={label}
          startAdornment={startAdornment}
          error={Boolean(meta.touched && meta.error)}
          helperText={meta.touched && meta.error ? meta.error : ''}
        />
      </FormControl>
    )}
  </Field>
);

export default DynamicInput;

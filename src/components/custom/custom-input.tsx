import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { useState } from "react";
import { FieldProps } from "formik";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import CustomOutlinedInput from "../../styles/theme/custom-outlined-input";
import { Controller, useFormContext } from "react-hook-form";

interface CustomInputProps extends FieldProps {
  label: string;
  type?: string;
  startAdornment?: React.ReactNode; // Add startAdornment as a prop
}

export const CustomInput: React.FC<CustomInputProps> = ({ field, form, label, type = 'text', startAdornment }) => {
  const theme = useTheme();
  const { name } = field;
  const { touched, errors } = form;

  return (
    <FormControl fullWidth error={Boolean(touched[name] && errors[name])} sx={{ ...theme.typography.body1, mb: 1 }}>
      <CustomOutlinedInput
        id={`outlined-adornment-${name}`}
        type={type}
        {...field}
        label={label}
        placeholder={label}
        startAdornment={startAdornment}
      />
      {touched[name] && errors[name] && (
        <FormHelperText error id={`standard-weight-helper-text-${name}`}>
          {errors[name] as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};

interface PasswordInputProps extends FieldProps {
  label: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ field, form, label }) => {
  const theme = useTheme();
  const { name } = field;
  const { touched, errors } = form;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth error={Boolean(touched[name] && errors[name])} sx={{ ...theme.typography.body1, mb: 1 }}>
      <CustomOutlinedInput
        placeholder={label}
        id={`outlined-adornment-${name}`}
        type={showPassword ? 'text' : 'password'}
        {...field}
        startAdornment={
          <InputAdornment position="start">
            <LockOutlined />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {touched[name] && errors[name] && (
        <FormHelperText error id={`standard-weight-helper-text-${name}`}>
          {errors[name] as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};

interface SelectFieldProps {
  name: string;
  label: string;
  options: Record<string, string>;
  error: any;
}

const SelectField = ({ name, label, options, error }: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth error={Boolean(error)}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label}>
            {Object.entries(options).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default SelectField;

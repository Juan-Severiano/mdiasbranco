import { Avatar, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { ReactNode, useState } from "react";
import { FieldProps } from "formik";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import CustomOutlinedInput from "../../styles/theme/custom-outlined-input";
import CustomSelect from "../../styles/theme/custom-select";
import { status } from "../../constants/status";

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

interface SelectFieldProps extends FieldProps {
  label: string;
  options: Record<string, string>;
  error?: any;
}

const SelectField = ({ form, field, options, label }: SelectFieldProps) => {
  const theme = useTheme();
  const { name } = field;
  const { touched, errors } = form;

  return (
    <FormControl fullWidth error={Boolean(touched[name] && errors[name])} sx={{ ...theme.typography.body1, mb: 1 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        label={label}
        value={field.value || ''}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {touched[name] && errors[name] && (
        <FormHelperText error id={`standard-weight-helper-text-${name}`}>
          {errors[name] as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};

interface SelectPureProps {
  label: string;
  options: Record<string, string>;
  value: string;
  onChange: (e: SelectChangeEvent<unknown>) => void;
  onBlur?: () => void;
  sx?: SxProps<Theme>;
  startAdornment?: ReactNode
}

export function SelectPure({ options, value, onChange, onBlur, sx, startAdornment }: SelectPureProps) {
  return (
    <>
      <CustomSelect
        label="Status"
        sx={{ maxHeight: 40, fontSize: 18, ...sx }}
        onBlur={onBlur}
        onChange={onChange}
        aria-label="Status"
        value={value}
        startAdornment={startAdornment}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            <Stack alignItems='center' flexDirection='row' width='100%'>
              { status[value] &&  <Avatar sx={{ width: 15, height: 15, mr: 2 }} src={`/Status/${key}.jpeg`} alt={`${value}sta tus`} /> }
              <Typography fontSize={15}>{value}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </CustomSelect>
    </>
  );
}

export default SelectField;

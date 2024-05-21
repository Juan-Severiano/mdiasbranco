import { Select } from '@mui/material';
import { styled } from '@mui/system';

const CustomSelect = styled(Select)(({ theme }) => ({
  border: 'none !important',
  outline: 'none',
  '& .MuiOutlinedInput-input::placeholder': {
    fontSize: '14px',
    color: '#6F6F73 !important',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:focus .MuiOutlinedInput-notchedOutline': {
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}80`,
  },
  backgroundColor: '#f3f3fa'
}));

export default CustomSelect;

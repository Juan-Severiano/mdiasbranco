import { FormControl, OutlinedInput, styled } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useCustomContext } from "../../contexts/context";

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  border: 'none !important',
  outline: 'none',
  '& .MuiOutlinedInput-input::placeholder': {
    fontSize: '12px',
    color: '#999',
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
  backgroundColor: 'white'
}));

export function SearchBar() {
  const { state, dispatch } = useCustomContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: 'SEARCH', payload: e.target.value })
  }

  return (
    <FormControl fullWidth>
      <CustomOutlinedInput
        sx={{
          height: 40
        }}
        value={state.search.search}
        onChange={handleChange}
        placeholder="Pesquisar"
        startAdornment={<Search color="disabled" fontSize="small" sx={{ mr: 2 }} />}
      />
    </FormControl>
  )
}

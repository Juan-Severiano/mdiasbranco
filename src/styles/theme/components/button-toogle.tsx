import { Components,  useTheme } from "@mui/material";
import type { Theme } from "../types";

const theme = useTheme()

export const MuiOutlinedInput = {
  styleOverrides: {
    root: {
      border: 'none !important',
      outline: 'none',
      '& .MuiOutlinedInput-input::placeholder': {
        fontSize: '12px', // Defina o tamanho do placeholder aqui
        color: '#999', // Defina a cor do placeholder se necessário
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Remove a borda
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Remove a borda no hover também, se necessário
      },
      '&:focus .MuiOutlinedInput-notchedOutline': {
        boxShadow: `0 0 0 3px ${theme.palette.primary.main}80`, // Sombra com a cor do tema principal
      },
      backgroundColor: 'white'
    }
  }
} satisfies Components<Theme>['MuiToggleButtonGroup'];

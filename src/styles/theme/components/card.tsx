import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiCard = {
  styleOverrides: {
    root: {
      borderRadius: '20px',
      boxShadow: 'none'
    }
  },
} satisfies Components<Theme>['MuiCard'];

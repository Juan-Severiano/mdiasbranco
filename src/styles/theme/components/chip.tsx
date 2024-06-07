import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiChip = {
  styleOverrides: {
    root: {
      backgroundColor: '#f3f3fa'
    }
  },
} satisfies Components<Theme>['MuiChip'];

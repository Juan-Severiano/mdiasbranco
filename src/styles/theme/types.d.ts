import type { CssVarsTheme } from '@mui/material/styles';
import type { Theme as BaseTheme } from '@mui/material/styles/createTheme';
import { PaletteBackgroundOptions } from '@mui/material/styles/createPalette';

export type Theme = Omit<BaseTheme, 'palette'> & CssVarsTheme;

export type ColorScheme = 'dark' | 'light';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    level1?: string;
    level2?: string;
    level3?: string;
  }

  interface PaletteRange {
    [x: number]: string
  }

  interface Palette {
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
  }

  interface PaletteOptions {
    neutral?: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
  }

  interface PaletteBackground extends TypeBackground {}

  interface PaletteBackgroundOptions extends Partial<TypeBackground> {}
}
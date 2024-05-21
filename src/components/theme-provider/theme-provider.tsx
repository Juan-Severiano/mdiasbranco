import React, { useState, useMemo, useContext, createContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { createTheme } from '../../styles/theme/create-theme';
import EmotionCache from './emotion-cache';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => createTheme(), []);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const cssVarsProviderConfig = {
    theme,
    defaultMode: mode,
    mode, // Passando o modo para o CssVarsProvider
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <EmotionCache options={{ key: 'mui' }}>
        <CssVarsProvider {...cssVarsProviderConfig}>
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </EmotionCache>
    </ThemeContext.Provider>
  );
};

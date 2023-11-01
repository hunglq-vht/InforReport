import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      // palette: palette(),
      palette: {
        mode: 'dark',
      },
      typography,
      // shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
      components: {
        MuiInputBase: {
          styleOverrides: {
            root: {
              height: '40px',
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              fontSize: '0.875rem',
              height: '40px',
            },
            input: {
              padding: '2px 2px',
            },
          },
        },
      },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

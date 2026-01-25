import type { TextFieldProps } from '@mui/material';

export const components = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        boxShadow: '0px 4px 18px rgba(47,43,61,0.6)',
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: 'small',
    } as Partial<TextFieldProps>,
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: '0px 4px 18px rgba(47,43,61,0.1)',
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(115,103,240,0.08)',
        },
      },
    },
  },
};

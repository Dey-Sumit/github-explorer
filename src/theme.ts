import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// GitHub-inspired colors
const githubColors = {
  dark: {
    background: '#0d1117',
    paper: '#161b22',
    primary: '#58a6ff',
    secondary: '#30363d',
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
    },
    error: '#f85149',
    success: '#2ea043',
    border: '#30363d',
  },
};

// Create a theme instance
const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: githubColors.dark.background,
      paper: githubColors.dark.paper,
    },
    primary: {
      main: githubColors.dark.primary,
    },
    secondary: {
      main: githubColors.dark.secondary,
    },
    text: {
      primary: githubColors.dark.text.primary,
      secondary: githubColors.dark.text.secondary,
    },
    error: {
      main: githubColors.dark.error,
    },
    success: {
      main: githubColors.dark.success,
    },
    divider: githubColors.dark.border,
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.85rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.8125rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '6px 16px',
        },
      },
      variants: [
        {
          props: { color: 'success' },
          style: {
            backgroundColor: githubColors.dark.success,
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#2c974b',
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: githubColors.dark.border,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: githubColors.dark.border,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme);

export default theme;

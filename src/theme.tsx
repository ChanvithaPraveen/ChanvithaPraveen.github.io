import { createTheme } from '@mui/material/styles';

const neonBlue = 'rgba(0, 255, 255, 1)'; // Neon Blue
const neonGreen = 'rgba(0, 255, 128, 1)'; // Neon Green

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: neonBlue,
    },
    secondary: {
      main: neonGreen,
    },
    background: {
      default: 'rgba(0, 0, 0, 0.7)', // Dark background with transparency
      paper: 'rgba(255, 255, 255, 0.1)', // Paper background with transparency
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.9)', // White text with slight transparency
      secondary: 'rgba(255, 255, 255, 0.7)', // Slightly more transparent white text
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Card background with transparency
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Card shadow
          // backdropFilter: 'blur(10px)', // Blur effect
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.7)',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Customize the font family
  },
});

export default darkTheme;

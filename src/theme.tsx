import { createTheme } from '@mui/material/styles';

const neonGreen = '#00ff41';
const neonCyan = '#00f0ff';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: neonGreen },
    secondary: { main: neonCyan },
    background: {
      default: '#0a0e0a',
      paper: 'rgba(15, 20, 16, 0.85)',
    },
    text: {
      primary: '#c8ffc8',
      secondary: '#7ed87e',
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Share Tech Mono", "Courier New", monospace',
  },
});

export default darkTheme;

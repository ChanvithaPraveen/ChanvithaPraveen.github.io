import '../styles/globals.css';
import '../styles/TechStack.css'; // Import the TechStack CSS here
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from '../theme'; // Import your dark theme

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

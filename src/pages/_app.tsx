// pages/_app.tsx
import '../styles/globals.css';
import '../styles/TechStack.css'; // Import the TechStack CSS here
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import darkTheme from '../theme'; // Import your dark theme
import { Typography } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <link rel="icon" type="image/png" href="../my-photo.png" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

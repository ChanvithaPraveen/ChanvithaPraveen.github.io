import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import darkTheme from '../theme';
import ChanaLauncher from '../components/chana/ChanaLauncher';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <link rel="icon" type="image/png" href="/my-photo-new.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <ChanaLauncher />
    </ThemeProvider>
  );
}

export default MyApp;

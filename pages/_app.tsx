import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import Layout from '../components/Layout';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{
      breakpoints: {
        xs: 500,
        sm: 768,
        md: 1000,
        lg: 1200,
        xl: 1400,
      }
    }} withGlobalStyles withNormalizeCSS >
     
        <Layout>
          <Component {...pageProps} />
        </Layout>
    

    </MantineProvider>
  )
}

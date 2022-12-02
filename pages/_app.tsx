import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import Layout from '../components/Layout';
import { Provider } from "react-redux"
import store from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';



let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <MantineProvider theme={{
            breakpoints: {
              xs: 500,
              sm: 768,
              md: 1000,
              lg: 1200,
              xl: 1400,
            },
          }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider position="top-center" >
              <ModalsProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
      </PersistGate>
    </Provider>

  )
}

import { ApolloProvider } from '@apollo/client';
import useApolloClient from 'hooks/useApolloClient';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { client } = useApolloClient();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  );
};

export default MyApp;

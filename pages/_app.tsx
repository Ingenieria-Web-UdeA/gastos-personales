import { ApolloProvider } from '@apollo/client';
import useApolloClient from 'hooks/useApolloClient';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { client } = useApolloClient();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;

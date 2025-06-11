'use client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// import from common
import { CONFIGS } from '@/common/configs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any = null;

const getHeaders = () => {
  // Get access token from local storage
  const accessToken = localStorage?.getItem('accessToken') || '';
  // Get refresh token from local storage
  // const refreshToken = localStorage.getItem('refreshToken') || '';
  // Return headers with tokens
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const createApolloClient = () => {
  if (client) return client;

  // create a new Apollo Client instance
  client = new ApolloClient({
    link: new HttpLink({
      uri: CONFIGS.GRAPHQL_ENDPOINT,
      credentials: 'include', // Send cookies
      fetchOptions: {
        mode: 'cors', // optional; CORS is default
      },
      headers: getHeaders(),
    }),
    cache: new InMemoryCache(),
  });
  return client;
};
export default createApolloClient;

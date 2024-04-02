import { HttpLink, InMemoryCache, ApolloClient, gql } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://main--time-pav6zq.apollographos.net/graphql',
    }),
  });
});

export { getClient, gql };

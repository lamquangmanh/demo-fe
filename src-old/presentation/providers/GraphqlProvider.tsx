'use client';

import { ApolloProvider } from '@apollo/client';
import createApolloClient from '@/infrastructure/graphql/apollo-client';

const client = createApolloClient();

export function GraphqlProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

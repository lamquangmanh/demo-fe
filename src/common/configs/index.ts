export const CONFIGS = {
  // Add your configurations here
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',

  NEXT_PUBLIC_WS_URL:
    process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/ws',
};

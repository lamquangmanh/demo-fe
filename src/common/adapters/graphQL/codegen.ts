import { CodegenConfig } from '@graphql-codegen/cli';

const configCodegen: CodegenConfig = {
  schema: process.env.API_URL,
  documents: ['src/modules/**/*', '!src/common/adapters/graphQL/gql/**/*'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/common/adapters/graphQL/gql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
  },
  watch: true,
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default configCodegen;

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createServer = (resolvers) => {
  // Load all .graphql files from the graphql directory and its subdirectories
  const typesArray = loadFilesSync(path.join(__dirname, '../graphql'), {
    extensions: ['graphql'],
    recursive: true, // This ensures we load files from subdirectories
  });
  
  const typeDefs = mergeTypeDefs(typesArray);

  return new ApolloServer({ typeDefs, resolvers });
};

export const startServer = async (server) => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
  return url;
}; 
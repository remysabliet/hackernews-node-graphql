import { resolvers } from "./resolvers/index.js";
import { createServer, startServer } from "./config/server.js";
import { ApolloServer } from "@apollo/server";

// Create and start server
const server: ApolloServer = createServer(resolvers);
startServer(server); 
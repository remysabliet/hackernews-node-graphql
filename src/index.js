import { resolvers } from "./resolvers/index.js";
import { createServer, startServer } from "./config/server.js";

// Create and start server
const server = createServer(resolvers);
startServer(server);

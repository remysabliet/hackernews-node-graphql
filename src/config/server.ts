import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServerPlugin } from "@apollo/server";
import "reflect-metadata";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { buildSchema } from "type-graphql";

import { Container } from "../container.js";
import { LinkResolver } from "../graphql/resolvers/LinkResolver.js";
import { UserResolver } from "../graphql/resolvers/UserResolver.js";
import { ResolverContext } from "../types/interfaces.js";
import { Vote } from "../graphql/types/Vote.js";
import { CustomDateScalar } from "../graphql/scalars/CustomDateScalar.js";

// Load environment variables
dotenv.config();

// Configuration constants
const PORT = process.env.PORT || 4000;
const DEFAULT_JWT_SECRET = "development-secret-key";

// Ensure JWT_SECRET is available
if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET is not set. Using a default secret for development.");
  process.env.JWT_SECRET = DEFAULT_JWT_SECRET;
}

/**
 * Creates and configures the Apollo Server instance
 * @returns {Promise<ApolloServer<ResolverContext>>} Configured Apollo Server
 */
export async function createServer(): Promise<ApolloServer<ResolverContext>> {
  try {
    const container = Container.getInstance();
    const authService = container.getAuthService();
    const linkService = container.getLinkService();

    const schema = await buildSchema({
      resolvers: [LinkResolver, UserResolver],
      orphanedTypes: [Vote],
      emitSchemaFile: true,
      validate: false,
      scalarsMap: [
        { type: Date, scalar: CustomDateScalar }
      ],
      container: {
        get: (type) => {
          if (type === UserResolver) {
            return new UserResolver(authService);
          }
          if (type === LinkResolver) {
            return new LinkResolver(linkService);
          }
          return null;
        }
      }
    });

    return new ApolloServer<ResolverContext>({
      schema,
      introspection: true, //Normally not good in production, just for learning purpose
      plugins: [ApolloServerPluginLandingPageLocalDefault() as ApolloServerPlugin<ResolverContext>]
    });
  } catch (error) {
    console.error("Failed to create server:", error);
    throw new Error("Server initialization failed");
  }
}

/**
 * Starts the Apollo Server and returns the server URL
 * @returns {Promise<{ server: ApolloServer<ResolverContext>; url: string }>} Server instance and URL
 */
export async function startServer() {
  const container = Container.getInstance();
  const prisma = container.getPrisma();
  const linkService = container.getLinkService();
  const authService = container.getAuthService();

  const server = await createServer();

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }): Promise<ResolverContext> => {
      const token = req.headers.authorization || "";
      const user = token ? await authService.getUserFromToken(token) : null;
      return {
        prisma,
        user,
        linkService,
        authService
      };
    },
  });

  console.log(`🚀 Server ready at ${url}`);
  return { server, url };
}
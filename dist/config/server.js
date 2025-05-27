import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { AuthService } from "../services/AuthService.js";
import { LinkService } from "../services/LinkService.js";
import { UserResolver } from "../graphql/resolvers/UserResolver.js";
import { LinkResolver } from "../graphql/resolvers/LinkResolver.js";
// Load environment variables
dotenv.config();
// Configuration constants
const PORT = process.env.PORT || 4000;
const DEFAULT_JWT_SECRET = "development-secret-key";
// Initialize services
const prisma = new PrismaClient();
const linkService = new LinkService(prisma);
// Ensure JWT_SECRET is available
if (!process.env.JWT_SECRET) {
    console.warn("Warning: JWT_SECRET is not set. Using a default secret for development.");
    process.env.JWT_SECRET = DEFAULT_JWT_SECRET;
}
const authService = new AuthService(prisma, process.env.JWT_SECRET);
/**
 * Creates and configures the Apollo Server instance
 * @returns {Promise<ApolloServer<ResolverContext>>} Configured Apollo Server
 */
export async function createServer() {
    try {
        const schema = await buildSchema({
            resolvers: [UserResolver, LinkResolver],
            emitSchemaFile: true,
            validate: false,
        });
        return new ApolloServer({
            schema,
        });
    }
    catch (error) {
        console.error("Failed to create server:", error);
        throw new Error("Server initialization failed");
    }
}
/**
 * Starts the Apollo Server and returns the server URL
 * @param {ApolloServer<ResolverContext>} server - Apollo Server instance
 * @returns {Promise<string>} Server URL
 */
export const startServer = async (server) => {
    try {
        const { url } = await startStandaloneServer(server, {
            listen: { port: Number(PORT) },
            context: async ({ req }) => {
                const token = req.headers.authorization?.replace("Bearer ", "");
                const user = token ? await authService.getUserFromToken(token) : null;
                return {
                    prisma,
                    authService,
                    linkService,
                    user,
                };
            },
        });
        console.log(`🚀 Server ready at ${url}`);
        return url;
    }
    catch (error) {
        console.error("Failed to start server:", error);
        throw new Error("Server startup failed");
    }
};

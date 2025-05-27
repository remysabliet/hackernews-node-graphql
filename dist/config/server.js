import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { AuthService } from "../services/AuthService.js";
import { LinkService } from "../services/LinkService.js";
import { getAuthContext } from "../middleware/auth.js";
import { authDirective } from "../directives/auth.js";
// Load environment variables
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Initialize services
const prisma = new PrismaClient();
const linkService = new LinkService(prisma);
// Ensure JWT_SECRET is available
if (!process.env.JWT_SECRET) {
    console.warn("Warning: JWT_SECRET is not set. Using a default secret for development.");
    process.env.JWT_SECRET = "development-secret-key";
}
const authService = new AuthService(prisma, process.env.JWT_SECRET);
export const createServer = (resolvers) => {
    // Load all GraphQL files
    const graphqlPath = path.join(__dirname, "../../src/graphql");
    console.log("Loading GraphQL files from:", graphqlPath);
    const typesArray = loadFilesSync(graphqlPath, {
        extensions: ["graphql"],
        recursive: true,
        ignoreIndex: true,
    });
    // console.log("Loaded GraphQL files:", typesArray.map(t => t.kind));
    // Add directive type definitions
    const directiveTypeDefs = authDirective.auth.typeDefs;
    const typeDefs = mergeTypeDefs([...typesArray, directiveTypeDefs]);
    // Create base schema
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    // Apply auth directive
    const schemaWithAuth = authDirective.auth.transformer(schema);
    // Create Apollo Server with the transformed schema
    const server = new ApolloServer({
        schema: schemaWithAuth,
    });
    return server;
};
export const startServer = async (server) => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            console.log("Creating context...");
            // Get auth context
            const { user } = await getAuthContext(authService)({ req });
            // Create context object
            const context = {
                user,
                prisma,
                linkService,
                authService,
            };
            return context;
        },
    });
    console.log(`🚀 Server ready at ${url}`);
    return url;
};
//# sourceMappingURL=server.js.map
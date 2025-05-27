import { ApolloServer } from "@apollo/server";
export declare const createServer: (resolvers: any) => ApolloServer;
export declare const startServer: (server: ApolloServer) => Promise<string>;

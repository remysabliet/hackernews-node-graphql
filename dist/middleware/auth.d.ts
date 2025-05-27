import { GraphQLSchema } from "graphql";
import { AuthService } from "../services/AuthService.js";
import { ResolverContext } from "../types/index.js";
export declare const authDirective: {
    auth: {
        typeDefs: string;
        transformer: (schema: GraphQLSchema) => GraphQLSchema;
    };
};
export declare const getAuthContext: (authService: AuthService) => ({ req }: ResolverContext) => Promise<{
    user: null;
} | {
    user: import("../types/index.js").User;
}>;

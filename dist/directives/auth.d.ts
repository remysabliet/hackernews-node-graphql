import { GraphQLSchema } from "graphql";
export declare const authDirective: {
    auth: {
        typeDefs: string;
        transformer: (schema: GraphQLSchema) => GraphQLSchema;
    };
};

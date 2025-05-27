/**
 * mapSchema: A function that lets you transform/modify a GraphQL schema
 * getDirective: A function that checks if a field has a specific directive and returns its data
 * MapperKind: An enum (set of constants) that defines different types of schema elements you can transform
 */

import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema, GraphQLFieldConfig } from "graphql";
import { AuthenticationError } from "../types/errors.js";
import { ResolverContext } from "../types/interfaces.js";


export const authDirective = {
  auth: { //This defines the @auth directive that can be applied to field definitions in your GraphQL
    typeDefs: `
      directive @auth on FIELD_DEFINITION
    `,

    // The transformer is a property containing an arrow function that takes a GraphQLSchema 
    // as input and returns a modified schema, used by GraphQL Tools to transform the original schema.
    transformer: (schema: GraphQLSchema) =>
      // mapSchema is a utility function from GraphQL Tools that allows you to transform/modify an existing GraphQL schema.
      // Calls the mapSchema function with your schema and a configuration object  
      mapSchema(schema, {
        // "For every field on every object type, run this function"
        [MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, ResolverContext>) => {
          // Checks if this specific field has the "auth" directive
          const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];

          // Only executes the following code if @auth is present on this field
          if (authDirective) {
            // Uses destructuring assignment to extract the resolve property from fieldConfig
            // = defaultFieldResolver: Sets a default value if no resolver exists
            // fieldConfig.resolve contains the original resolver function for this field
            const { resolve = defaultFieldResolver } = fieldConfig;

            // Basically we are wrapping the original resolver function with the authentication logic
            // Replaces the field's resolver with a new async function that checks if the user is authenticated
            // If not authenticated (context.user is undefined) we through an exception 
            // otherwise we call the original resolver function so that we do not lose any functionality
    
            fieldConfig.resolve = async (source, args, context, info) => {
              if (!context.user) {
                throw new AuthenticationError();
              }
              return resolve(source, args, context, info);
            };
          }
          return fieldConfig;
        },
      }),
  },
}; 
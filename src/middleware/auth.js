import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";

export const authDirective = {
  auth: {
    typeDefs: `
      directive @auth on FIELD_DEFINITION
    `,
    transformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];

          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;

            fieldConfig.resolve = async (source, args, context, info) => {
              if (!context.user) {
                throw new Error("Not authenticated");
              }
              return resolve(source, args, context, info);
            };
          }
          return fieldConfig;
        },
      }),
  },
};

export const getAuthContext = (authService) => {
  return async ({ req }) => {
    try {
      // Get the token from the Authorization header
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        return { user: null };
      }

      // Verify token and get user
      const user = await authService.getUserFromToken(token);
      return { user };
    } catch (error) {
      console.error("Auth context error:", error);
      return { user: null };
    }
  };
};

import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";
import { AuthenticationError } from "../types/errors.js";
export const authDirective = {
    auth: {
        typeDefs: `
      directive @auth on FIELD_DEFINITION
    `,
        transformer: (schema) => mapSchema(schema, {
            [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];
                if (authDirective) {
                    const { resolve = defaultFieldResolver } = fieldConfig;
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
//# sourceMappingURL=auth.js.map
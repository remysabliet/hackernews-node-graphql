import { userResolvers } from "./userResolvers.js";
import { linkResolvers } from "./linkResolvers.js";
export const resolvers = {
    Query: {
        ...(linkResolvers.Query || {}),
    },
    Mutation: {
        ...(userResolvers.Mutation || {}),
        ...(linkResolvers.Mutation || {}),
    },
    User: {
        ...(userResolvers.User || {}),
    },
    Link: {
        ...(linkResolvers.Link || {}),
    },
};
//# sourceMappingURL=index.js.map
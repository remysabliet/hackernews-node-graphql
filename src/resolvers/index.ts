import { ResolverMap } from "../types/interfaces.js";

import { userResolvers } from "./userResolvers.js";
import { linkResolvers } from "./linkResolvers.js";

export const resolvers: ResolverMap = {
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
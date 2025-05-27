import { ResolverMap } from "../types/interfaces.js";
import { SignupArgs, LoginArgs } from "../types/interfaces.js";

export const userResolvers: ResolverMap = {
  Mutation: {
    signup: async (_, args, context) => {
      if (!context.authService) {
        throw new Error("AuthService is not available in context");
      }
      if (!args.name || !args.email || !args.password) {
        throw new Error("Name, email, and password are required");
      }
      return context.authService.signup(args as SignupArgs);
    },
    login: async (_, args, context) => {
      if (!context.authService) {
        throw new Error("AuthService is not available in context");
      }
      if (!args.email || !args.password) {
        throw new Error("Email and password are required");
      }
      return context.authService.login(args as LoginArgs);
    },
  },
  User: {
    links: async (parent, _, context) => {
      if (!context.prisma) {
        throw new Error("Prisma client is not available in context");
      }
      return context.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .links();
    },
  },
}; 
export const userResolvers = {
  Mutation: {
    signup: async (_, args, context) => {
      if (!context.authService) {
        throw new Error("AuthService is not available in context");
      }
      return context.authService.signup(args);
    },
    login: async (_, args, context) => {
      if (!context.authService) {
        throw new Error("AuthService is not available in context");
      }
      return context.authService.login(args);
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

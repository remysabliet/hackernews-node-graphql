// Resolvers
export const linkResolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (_, args, { linkService }) => linkService.getAllLinks(),
    link: (_, { id }, { linkService }) => linkService.getLinkById(id),
  },
  Mutation: {
    post: (_, { url, description }, { linkService, user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return linkService.createLink(url, description, user.id);
    },
    updateLink: (_, { id, url, description }, { linkService, user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return linkService.updateLink(id, { url, description });
    },
    deleteLink: (_, { id }, { linkService, user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return linkService.deleteLink(id);
    },
  },
  Link: {
    postedBy: (parent, _, { prisma }) => {
      return prisma.link.findUnique({
        where: { id: parent.id }
      }).postedBy();
    }
  }
};

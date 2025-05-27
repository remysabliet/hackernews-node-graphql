export const linkResolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (_, args, { linkService }) => linkService.getAllLinks(),
        link: (_, { id }, { linkService }) => {
            if (!id)
                throw new Error('ID is required');
            return linkService.getLinkById(id);
        },
    },
    Mutation: {
        post: (_, { url, description }, { linkService, user }) => {
            if (!user) {
                throw new Error('Not authenticated');
            }
            if (!url || !description) {
                throw new Error('URL and description are required');
            }
            return linkService.createLink(url, description, user.id);
        },
        updateLink: (_, { id, url, description }, { linkService, user }) => {
            if (!user) {
                throw new Error('Not authenticated');
            }
            if (!id) {
                throw new Error('ID is required');
            }
            return linkService.updateLink(id, { url, description });
        },
        deleteLink: (_, { id }, { linkService, user }) => {
            if (!user) {
                throw new Error('Not authenticated');
            }
            if (!id) {
                throw new Error('ID is required');
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
//# sourceMappingURL=linkResolvers.js.map
import { LinkService } from './services/LinkService.js';
import { createServer, startServer } from './config/server.js';

// Initialize services
const linkService = new LinkService();

// Resolvers
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => linkService.getAllLinks(),
    link: (_, { id }) => linkService.getLinkById(id),
  },
  Mutation: {
    post: (_, { url, description }) => 
      linkService.createLink(url, description),
    updateLink: (_, { id, url, description }) => 
      linkService.updateLink(id, { url, description }),
    deleteLink: (_, { id }) => 
      linkService.deleteLink(id),
  },
};

// Create and start server
const server = createServer(resolvers);
startServer(server);

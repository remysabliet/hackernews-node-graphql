import { Link } from '../models/Link.js';

export class LinkService {
  constructor() {
    this.links = [
      new Link('link-0', 'www.howtographql.com', 'Fullstack tutorial for GraphQL')
    ];
    this.idCount = this.links.length;
  }

  getAllLinks() {
    return this.links.map(link => link.toJSON());
  }

  getLinkById(id) {
    const link = this.links.find(link => link.id === id);
    return link ? link.toJSON() : null;
  }

  createLink(url, description) {
    const link = new Link(`link-${this.idCount++}`, url, description);
    this.links.push(link);
    return link.toJSON();
  }

  updateLink(id, updates) {
    const link = this.links.find(link => link.id === id);
    if (!link) return null;

    if (updates.url !== undefined) link.url = updates.url;
    if (updates.description !== undefined) link.description = updates.description;

    return link.toJSON();
  }

  deleteLink(id) {
    const index = this.links.findIndex(link => link.id === id);
    if (index === -1) return null;
    
    const [deleted] = this.links.splice(index, 1);
    return deleted.toJSON();
  }
} 
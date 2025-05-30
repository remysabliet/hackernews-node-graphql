import { LinkRepository } from "../repositories/LinkRepository.js";
import { BaseService } from "./BaseService.js";
import { Link } from "../graphql/types/Link.js";

interface LinkUpdates {
  url?: string;
  description?: string;
}

export class LinkService extends BaseService<Link> {
  constructor(private linkRepository: LinkRepository) {
    super(linkRepository);
  }

  async getAllLinks(): Promise<Link[]> {
    return this.getAll();
  }

  async getLinkById(id: string): Promise<Link | null> {
    return this.getById(id);
  }

  async createLink(url: string, description: string, userId: number): Promise<Link> {
    if (!userId) {
      throw new Error('User ID is required to create a link');
    }
    return this.linkRepository.create({ url, description, userId });
  }

  async updateLink(id: string, updates: LinkUpdates): Promise<Link> {
    // Here you could add business logic like:
    // - Authorization checks
    // - Update validation
    // - etc.

    return this.linkRepository.update(id, updates);
  }

  async deleteLink(id: string): Promise<Link> {
    // Here you could add business logic like:
    // - Authorization checks
    // - Soft delete logic
    // - etc.

    return this.linkRepository.delete(id);
  }

  async vote(linkId: string, userId: number): Promise<Link> {
    // Here you could add business logic like:
    // - Authorization checks
    // - Soft delete logic
    // - etc.
    return this.linkRepository.vote(linkId, userId);
  }
} 
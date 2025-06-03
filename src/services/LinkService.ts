import { LinkRepository } from "../repositories/LinkRepository.js";
import { BaseService } from "./BaseService.js";
import { Link } from "../graphql/types/Link.js";
import { LinkFilter } from "../graphql/types/LinkFilter.js";
import { PaginationInput } from "../graphql/types/PaginationInput.js";
import { PaginationInfo } from "../graphql/types/PaginatedResponse.js";

interface PaginatedResponse {
  items: Link[];
  pagination: PaginationInfo;
}

interface LinkUpdates {
  url?: string;
  description?: string;
}

export class LinkService extends BaseService<Link> {
  constructor(private linkRepository: LinkRepository) {
    super(linkRepository);
  }

  async getAllLinks(
    filter: LinkFilter = {},
    pagination: PaginationInput = { take: 10 }
  ): Promise<PaginatedResponse> {
    return this.linkRepository.findWithFilters(filter, pagination);
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
    return this.linkRepository.update(id, updates);
  }

  async deleteLink(id: string): Promise<Link> {
    return this.linkRepository.delete(id);
  }

  async vote(linkId: string, userId: number): Promise<Link> {
    return this.linkRepository.vote(linkId, userId);
  }
} 
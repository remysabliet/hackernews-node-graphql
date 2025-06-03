import { BaseService } from "./BaseService.js";
export class LinkService extends BaseService {
    constructor(linkRepository) {
        super(linkRepository);
        this.linkRepository = linkRepository;
    }
    async getAllLinks(filter = {}, pagination = { take: 10 }) {
        return this.linkRepository.findWithFilters(filter, pagination);
    }
    async getLinkById(id) {
        return this.getById(id);
    }
    async createLink(url, description, userId) {
        if (!userId) {
            throw new Error('User ID is required to create a link');
        }
        return this.linkRepository.create({ url, description, userId });
    }
    async updateLink(id, updates) {
        return this.linkRepository.update(id, updates);
    }
    async deleteLink(id) {
        return this.linkRepository.delete(id);
    }
    async vote(linkId, userId) {
        return this.linkRepository.vote(linkId, userId);
    }
}

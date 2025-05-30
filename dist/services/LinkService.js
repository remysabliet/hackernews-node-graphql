import { BaseService } from "./BaseService.js";
export class LinkService extends BaseService {
    constructor(linkRepository) {
        super(linkRepository);
        this.linkRepository = linkRepository;
    }
    async getAllLinks() {
        return this.getAll();
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
        // Here you could add business logic like:
        // - Authorization checks
        // - Update validation
        // - etc.
        return this.linkRepository.update(id, updates);
    }
    async deleteLink(id) {
        // Here you could add business logic like:
        // - Authorization checks
        // - Soft delete logic
        // - etc.
        return this.linkRepository.delete(id);
    }
    async vote(linkId, userId) {
        // Here you could add business logic like:
        // - Authorization checks
        // - Soft delete logic
        // - etc.
        console.log("passage", this.linkRepository);
        return this.linkRepository.vote(linkId, userId);
    }
}

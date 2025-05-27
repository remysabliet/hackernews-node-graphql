var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware, ID } from "type-graphql";
import { Link } from "../types/Link.js";
import { LinkService } from "../../services/LinkService.js";
import { auth } from "../../middleware/auth.js";
let LinkResolver = class LinkResolver {
    async links({ prisma }) {
        const linkService = new LinkService(prisma);
        const links = await linkService.getAllLinks();
        return links.map(link => ({
            ...link,
            postedBy: link.postedBy || undefined
        }));
    }
    async link(id, { prisma }) {
        const linkService = new LinkService(prisma);
        const link = await linkService.getLinkById(id);
        if (!link)
            return null;
        return {
            ...link,
            postedBy: link.postedBy || undefined
        };
    }
    async createLink(url, description, { user, prisma }) {
        const linkService = new LinkService(prisma);
        const link = await linkService.createLink(url, description, user.id);
        return {
            ...link,
            postedBy: link.postedBy || undefined
        };
    }
    async updateLink(id, { prisma }, url, description) {
        const linkService = new LinkService(prisma);
        const link = await linkService.updateLink(id, { url, description });
        return {
            ...link,
            postedBy: link.postedBy || undefined
        };
    }
    async deleteLink(id, { prisma }) {
        const linkService = new LinkService(prisma);
        const link = await linkService.deleteLink(id);
        return {
            ...link,
            postedBy: link.postedBy || undefined
        };
    }
};
__decorate([
    Query(() => [Link]),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "links", null);
__decorate([
    Query(() => Link, { nullable: true }),
    __param(0, Arg("id", () => ID)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "link", null);
__decorate([
    Mutation(() => Link),
    UseMiddleware(auth),
    __param(0, Arg("url")),
    __param(1, Arg("description")),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "createLink", null);
__decorate([
    Mutation(() => Link),
    UseMiddleware(auth),
    __param(0, Arg("id", () => ID)),
    __param(1, Ctx()),
    __param(2, Arg("url", { nullable: true })),
    __param(3, Arg("description", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "updateLink", null);
__decorate([
    Mutation(() => Link),
    UseMiddleware(auth),
    __param(0, Arg("id", () => ID)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "deleteLink", null);
LinkResolver = __decorate([
    Resolver(Link)
], LinkResolver);
export { LinkResolver };

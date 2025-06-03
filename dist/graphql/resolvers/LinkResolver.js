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
import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware, ID, ObjectType, Field } from "type-graphql";
import { Link } from "../types/Link.js";
import { Vote } from "../types/Vote.js";
import { LinkService } from "../../services/LinkService.js";
import { auth } from "../../middleware/auth.js";
import { LinkFilter } from "../types/LinkFilter.js";
import { PaginationInput } from "../types/PaginationInput.js";
import { PaginationInfo } from "../types/PaginatedResponse.js";
let PaginatedLinkResponse = class PaginatedLinkResponse {
};
__decorate([
    Field(() => [Link]),
    __metadata("design:type", Array)
], PaginatedLinkResponse.prototype, "items", void 0);
__decorate([
    Field(() => PaginationInfo),
    __metadata("design:type", PaginationInfo)
], PaginatedLinkResponse.prototype, "pagination", void 0);
PaginatedLinkResponse = __decorate([
    ObjectType()
], PaginatedLinkResponse);
let LinkResolver = class LinkResolver {
    constructor(linkService) {
        this.linkService = linkService;
    }
    /**
     * Look for all links with optional filtering and pagination
     * @param filter - Optional filter criteria
     * @param pagination - Optional pagination parameters (defaults to page 1, 10 items per page)
     * @returns Paginated list of links matching the criteria
     */
    async feeds(filter, pagination) {
        return await this.linkService.getAllLinks(filter, pagination);
    }
    async link(id) {
        return await this.linkService.getLinkById(id);
    }
    /**
   * Creates a new link posted by the authenticated user.
   *
   * This mutation requires authentication - only logged-in users can create links.
   * The link will be automatically associated with the user who created it.
   *
   * @param url - The URL of the link to be shared
   * @param description - A description or title for the link
   * @param context - GraphQL resolver context containing authenticated user and Prisma client
   *
   * @returns Promise<Link> - The newly created link with associated user information
   *
   * @throws {AuthenticationError} - When user is not authenticated (handled by @UseMiddleware(auth))
   * @throws {ValidationError} - When URL or description is invalid (handled by LinkService)
   *
   * @example
   * ```graphql
   * mutation {
   *   createLink(
   *     url: "https://example.com"
   *     description: "An interesting article"
   *   ) {
   *     id
   *     url
   *     description
   *     postedBy {
   *       id
   *       name
   *     }
   *     createdAt
   *   }
   * }
   * ```
   */
    async createLink(url, description, { user }) {
        return await this.linkService.createLink(url, description, user.id);
    }
    async updateLink(id, url, description) {
        return await this.linkService.updateLink(id, { url, description });
    }
    async deleteLink(id) {
        return await this.linkService.deleteLink(id);
    }
    async vote(linkId, { user }) {
        if (!user) {
            throw new Error("Cannot vote without logging in.");
        }
        const link = await this.linkService.vote(linkId, user.id);
        return {
            id: Date.now(), // Temporary ID since we don't store votes separately
            link,
            user
        };
    }
};
__decorate([
    Query(() => PaginatedLinkResponse),
    __param(0, Arg("filter", () => LinkFilter, { nullable: true })),
    __param(1, Arg("pagination", () => PaginationInput, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LinkFilter,
        PaginationInput]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "feeds", null);
__decorate([
    Query(() => Link, { nullable: true }),
    __param(0, Arg("id", () => ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
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
    __param(1, Arg("url", { nullable: true })),
    __param(2, Arg("description", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "updateLink", null);
__decorate([
    Mutation(() => Link),
    UseMiddleware(auth),
    __param(0, Arg("id", () => ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "deleteLink", null);
__decorate([
    Mutation(() => Vote),
    UseMiddleware(auth),
    __param(0, Arg("linkId", () => ID)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "vote", null);
LinkResolver = __decorate([
    Resolver(Link),
    __metadata("design:paramtypes", [LinkService])
], LinkResolver);
export { LinkResolver };

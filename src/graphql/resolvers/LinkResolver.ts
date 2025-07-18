import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware, ID, ObjectType, Field } from "type-graphql";
import { Link } from "../types/Link.js";
import { Vote } from "../types/Vote.js";
import { LinkService } from "../../services/LinkService.js";
import { LinkRepository } from "../../repositories/LinkRepository.js";
import type { ResolverContext } from "../../types/interfaces.js";
import { auth } from "../../middleware/auth.js";
import { LinkFilter } from "../types/LinkFilter.js";
import { PaginationInput } from "../types/PaginationInput.js";
import { PaginationInfo } from "../types/PaginatedResponse.js";

@ObjectType()
class PaginatedLinkResponse {
  @Field(() => [Link])
  items: Link[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

@Resolver(Link)
export class LinkResolver {
  constructor(
    private linkService: LinkService
  ) { }

  /**
   * Look for all links with optional filtering and pagination
   * @param filter - Optional filter criteria
   * @param pagination - Optional pagination parameters (defaults to page 1, 10 items per page)
   * @returns Paginated list of links matching the criteria
   */
  @Query(() => PaginatedLinkResponse)
  async feeds(
    @Arg("filter", () => LinkFilter, { nullable: true }) filter?: LinkFilter,
    @Arg("pagination", () => PaginationInput, { nullable: true }) pagination?: PaginationInput
  ) {
    console.log("filters", filter);
    return await this.linkService.getAllLinks(filter, pagination);
  }

  @Query(() => Link, { nullable: true })
  async link(@Arg("id", () => ID) id: string): Promise<Link | null> {
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
  @Mutation(() => Link)
  @UseMiddleware(auth)
  async createLink(
    @Arg("url") url: string,
    @Arg("description") description: string,
    @Ctx() { user }: ResolverContext
  ): Promise<Link> {
    return await this.linkService.createLink(url, description, user!.id);
  }

  @Mutation(() => Link)
  @UseMiddleware(auth)
  async updateLink(
    @Arg("id", () => ID) id: string,
    @Arg("url", { nullable: true }) url?: string,
    @Arg("description", { nullable: true }) description?: string
  ): Promise<Link> {
    return await this.linkService.updateLink(id, { url, description });
  }

  @Mutation(() => Link)
  @UseMiddleware(auth)
  async deleteLink(
    @Arg("id", () => ID) id: string
  ): Promise<Link> {
    return await this.linkService.deleteLink(id);
  }

  @Mutation(() => Vote)
  @UseMiddleware(auth)
  async vote(
    @Arg("linkId", () => ID) linkId: string,
    @Ctx() { user }: ResolverContext
  ): Promise<Vote> {
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
} 
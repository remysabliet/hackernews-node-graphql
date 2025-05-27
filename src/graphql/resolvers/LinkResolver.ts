import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware, ID } from "type-graphql";
import { Link } from "../types/Link.js";
import { LinkService } from "../../services/LinkService.js";
import { ResolverContext } from "../../types/interfaces.js";
import { auth } from "../../middleware/auth.js";

@Resolver(Link)
export class LinkResolver {
  @Query(() => [Link])
  async links(@Ctx() { prisma }: ResolverContext): Promise<Link[]> {
    const linkService = new LinkService(prisma);
    const links = await linkService.getAllLinks();
    return links.map(link => ({
      ...link,
      postedBy: link.postedBy || undefined
    }));
  }

  @Query(() => Link, { nullable: true })
  async link(@Arg("id", () => ID) id: string, @Ctx() { prisma }: ResolverContext): Promise<Link | null> {
    const linkService = new LinkService(prisma);
    const link = await linkService.getLinkById(id);
    if (!link) return null;
    return {
      ...link,
      postedBy: link.postedBy || undefined
    };
  }

  @Mutation(() => Link)
  @UseMiddleware(auth)
  async createLink(
    @Arg("url") url: string,
    @Arg("description") description: string,
    @Ctx() { user, prisma }: ResolverContext
  ): Promise<Link> {
    const linkService = new LinkService(prisma);
    const link = await linkService.createLink(url, description, user!.id);
    return {
      ...link,
      postedBy: link.postedBy || undefined
    };
  }

  @Mutation(() => Link)
  @UseMiddleware(auth)
  async updateLink(
    @Arg("id", () => ID) id: string,
    @Ctx() { prisma }: ResolverContext,
    @Arg("url", { nullable: true }) url?: string,
    @Arg("description", { nullable: true }) description?: string
  ): Promise<Link> {
    const linkService = new LinkService(prisma);
    const link = await linkService.updateLink(id, { url, description });
    return {
      ...link,
      postedBy: link.postedBy || undefined
    };
  }

  @Mutation(() => Link)
  @UseMiddleware(auth)
  async deleteLink(
    @Arg("id", () => ID) id: string,
    @Ctx() { prisma }: ResolverContext
  ): Promise<Link> {
    const linkService = new LinkService(prisma);
    const link = await linkService.deleteLink(id);
    return {
      ...link,
      postedBy: link.postedBy || undefined
    };
  }
} 
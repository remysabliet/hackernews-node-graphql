import { PrismaClient, Prisma } from "@prisma/client";
import { Link } from "../graphql/types/Link.js";
import { IBaseRepository } from "./BaseRepository.js";

type PrismaLink = Prisma.LinkGetPayload<{
  include: { postedBy: true; voters: true }
}>;

export class LinkRepository implements IBaseRepository<Link> {
  constructor(private prisma: PrismaClient) { }

  private mapPrismaLinkToLink(link: PrismaLink): Link {
    return {
      id: link.id,
      url: link.url,
      description: link.description,
      createdAt: link.createdAt,
      postedById: link.postedById || undefined,
      postedBy: link.postedBy || undefined,
      voters: link.voters || undefined
    };
  }

  async findAll(): Promise<Link[]> {
    const links = await this.prisma.link.findMany({
      include: {
        postedBy: true,
        voters: true
      }
    });
    return links.map(this.mapPrismaLinkToLink);
  }

  async findById(id: string): Promise<Link | null> {
    const link = await this.prisma.link.findUnique({
      where: { id: parseInt(id) },
      include: {
        postedBy: true,
        voters: true
      }
    });
    if (!link) return null;
    return this.mapPrismaLinkToLink(link);
  }

  async create(data: Partial<Link> & { userId: number }): Promise<Link> {
    const link = await this.prisma.link.create({
      data: {
        url: data.url!,
        description: data.description!,
        postedBy: {
          connect: { id: data.userId }
        }
      },
      include: {
        postedBy: true,
        voters: true
      }
    });
    return this.mapPrismaLinkToLink(link);
  }

  async update(id: string, data: Partial<Link>): Promise<Link> {
    const link = await this.prisma.link.update({
      where: { id: parseInt(id) },
      data: {
        url: data.url,
        description: data.description
      },
      include: {
        postedBy: true,
        voters: true
      }
    });
    return this.mapPrismaLinkToLink(link);
  }

  async delete(id: string): Promise<Link> {
    const link = await this.prisma.link.delete({
      where: { id: parseInt(id) },
      include: {
        postedBy: true,
        voters: true
      }
    });
    return this.mapPrismaLinkToLink(link);
  }

  async vote(linkId: string, userId: number): Promise<Link> {
    const link = await this.prisma.link.update({
      where: {
        id: parseInt(linkId)
      },
      data: {
        voters: {
          connect: { id: userId } //  connect means "add a new relationship in the join table" _Votes
        }
      },
      include: {
        postedBy: true, 
        voters: true 
      }
    });
    return this.mapPrismaLinkToLink(link);
  }
} 
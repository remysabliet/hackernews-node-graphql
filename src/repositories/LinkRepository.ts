import { PrismaClient, Prisma } from "@prisma/client";
import { Link } from "../graphql/types/Link.js";
import { IBaseRepository } from "./BaseRepository.js";
import { LinkFilter } from "../graphql/types/LinkFilter.js";
import { PaginationInput } from "../graphql/types/PaginationInput.js";
import { PaginationInfo } from "../graphql/types/PaginatedResponse.js";

type PrismaLink = Prisma.LinkGetPayload<{
  include: { postedBy: true; voters: true }
}>;

interface PaginatedResponse {
  items: Link[];
  pagination: PaginationInfo;
}

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
    return link ? this.mapPrismaLinkToLink(link) : null;
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
      where: { id: parseInt(linkId) },
      data: {
        voters: {
          connect: { id: userId }
        }
      },
      include: {
        postedBy: true,
        voters: true
      }
    });
    return this.mapPrismaLinkToLink(link);
  }

  async findWithFilters(
    filter: LinkFilter,
    pagination: PaginationInput
  ): Promise<PaginatedResponse> {
    const where: Prisma.LinkWhereInput = this.buildWhereClause(filter);
    const orderBy: Prisma.LinkOrderByWithRelationInput = this.buildOrderByClause(filter);

    // Handle cursor-based pagination
    const cursor = pagination.cursor ? { id: parseInt(pagination.cursor) } : undefined;

    // Get paginated results
    const links = await this.prisma.link.findMany({
      where,
      orderBy,
      take: pagination.take + 1,
      cursor,
      include: {
        postedBy: true,
        voters: true
      }
    });

    // Check if there's a next page
    const hasNextPage = links.length > pagination.take;
    // Remove the extra item if it exists
    const items = hasNextPage ? links.slice(0, -1) : links;

    // Filter by minimum votes count after fetching if needed
    let filteredLinks = items;
    if (filter.minVotes) {
      filteredLinks = items.filter(link => link.voters.length >= filter.minVotes!);
    }

    const paginationInfo: PaginationInfo = {
      take: pagination.take,
      cursor: hasNextPage ? items[items.length - 1].id.toString() : undefined,
      hasNextPage
    };

    return {
      items: filteredLinks.map(this.mapPrismaLinkToLink),
      pagination: paginationInfo
    };
  }

  private buildWhereClause(filter: LinkFilter): Prisma.LinkWhereInput {
    const where: Prisma.LinkWhereInput = {};

    if (filter.search) {
      where.OR = [
        { description: { contains: filter.search } },
        { url: { contains: filter.search } }
      ];
    }

    if (filter.postedById) {
      where.postedById = filter.postedById;
    }

    if (filter.minVotes) {
      where.voters = {
        some: {}
      };
    }

    if (filter.startDate || filter.endDate) {
      where.createdAt = {};
      if (filter.startDate) {
        where.createdAt.gte = filter.startDate;
      }
      if (filter.endDate) {
        where.createdAt.lte = filter.endDate;
      }
    }

    return where;
  }

  private buildOrderByClause(filter: LinkFilter): Prisma.LinkOrderByWithRelationInput {
    const orderBy: Prisma.LinkOrderByWithRelationInput = {};
    
    if (filter.sort && filter.sort.length > 0) {
      // Convert array of sort criteria to Prisma's orderBy format
      filter.sort.forEach(sort => {
        if (sort.field === 'votes') {
          orderBy.voters = {
            _count: sort.order
          };
        } else {
          orderBy[sort.field] = sort.order;
        }
      });
    }

    return orderBy;
  }
} 
import { PrismaClient } from "@prisma/client";
import { Link, User } from "../types/index.js";

interface LinkWithUser extends Link {
  postedBy: User | null;
}

interface LinkUpdates {
  url?: string;
  description?: string;
}

export class LinkService {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    if (!prismaClient) {
      throw new Error("PrismaClient is required");
    }
    this.prisma = prismaClient;
  }

  async getAllLinks(): Promise<LinkWithUser[]> {
    return this.prisma.link.findMany({
      include: {
        postedBy: true
      }
    });
  }

  async getLinkById(id: string | number): Promise<LinkWithUser | null> {
    return this.prisma.link.findUnique({
      where: { id: parseInt(id.toString()) },
      include: {
        postedBy: true
      }
    });
  }

  async createLink(url: string, description: string, userId: number): Promise<LinkWithUser> {
    if (!userId) {
      throw new Error('User ID is required to create a link');
    }

    return this.prisma.link.create({
      data: {
        url,
        description,
        postedBy: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        postedBy: true
      }
    });
  }

  async updateLink(id: string | number, updates: LinkUpdates): Promise<LinkWithUser> {
    return this.prisma.link.update({
      where: { id: parseInt(id.toString()) },
      data: updates,
      include: {
        postedBy: true
      }
    });
  }

  async deleteLink(id: string | number): Promise<LinkWithUser> {
    return this.prisma.link.delete({
      where: { id: parseInt(id.toString()) },
      include: {
        postedBy: true
      }
    });
  }
} 
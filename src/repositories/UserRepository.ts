import { PrismaClient, Prisma } from "@prisma/client";
import { User } from "../types/index.js";
import { BaseRepository } from "./BaseRepository.js";

export interface UserWithLinks extends User {
  links: any[]; // Replace with proper Link type if needed
}

export class UserRepository extends BaseRepository<UserWithLinks> {
  protected modelName: Prisma.ModelName = 'User';

  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async findByEmail(email: string): Promise<UserWithLinks | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        links: true
      }
    });
  }

  async findAll(): Promise<UserWithLinks[]> {
    return this.prisma.user.findMany({
      include: {
        links: true
      }
    });
  }

  async findById(id: string | number): Promise<UserWithLinks | null> {
    return this.prisma.user.findUnique({
      where: { id: typeof id === 'string' ? parseInt(id) : id },
      include: {
        links: true
      }
    });
  }
} 
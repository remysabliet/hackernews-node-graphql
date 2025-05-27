import { PrismaClient, Prisma } from "@prisma/client";

type ModelName = Prisma.ModelName;

export class BaseService {
  protected prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  protected async findById<T>(model: ModelName, id: number | string): Promise<T | null> {
    const modelClient = this.prisma[model.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.findUnique({
      where: { id: typeof id === 'string' ? parseInt(id) : id }
    }) as Promise<T | null>;
  }

  protected async findAll<T>(model: ModelName): Promise<T[]> {
    const modelClient = this.prisma[model.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.findMany() as Promise<T[]>;
  }

  protected async create<T>(model: ModelName, data: any): Promise<T> {
    const modelClient = this.prisma[model.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.create({ data }) as Promise<T>;
  }

  protected async update<T>(model: ModelName, id: number | string, data: any): Promise<T> {
    const modelClient = this.prisma[model.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.update({
      where: { id: typeof id === 'string' ? parseInt(id) : id },
      data
    }) as Promise<T>;
  }

  protected async delete<T>(model: ModelName, id: number | string): Promise<T> {
    const modelClient = this.prisma[model.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.delete({
      where: { id: typeof id === 'string' ? parseInt(id) : id }
    }) as Promise<T>;
  }
} 
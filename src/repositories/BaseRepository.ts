import { PrismaClient, Prisma } from "@prisma/client";

export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string | number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<T>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected abstract modelName: Prisma.ModelName;

  constructor(protected prisma: PrismaClient) {}

  async findAll(): Promise<T[]> {
    const modelClient = this.prisma[this.modelName.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.findMany();
  }

  async findById(id: string | number): Promise<T | null> {
    const modelClient = this.prisma[this.modelName.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.findUnique({
      where: { id: typeof id === 'string' ? parseInt(id) : id }
    });
  }

  async create(data: Partial<T>): Promise<T> {
    const modelClient = this.prisma[this.modelName.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.create({ data });
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    const modelClient = this.prisma[this.modelName.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.update({
      where: { id: typeof id === 'string' ? parseInt(id) : id },
      data
    });
  }

  async delete(id: string | number): Promise<T> {
    const modelClient = this.prisma[this.modelName.toLowerCase() as keyof PrismaClient] as any;
    return modelClient.delete({
      where: { id: typeof id === 'string' ? parseInt(id) : id }
    });
  }
} 
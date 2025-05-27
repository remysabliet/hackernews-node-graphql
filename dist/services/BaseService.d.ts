import { PrismaClient, Prisma } from "@prisma/client";
type ModelName = Prisma.ModelName;
export declare class BaseService {
    protected prisma: PrismaClient;
    constructor(prismaClient: PrismaClient);
    protected findById<T>(model: ModelName, id: number | string): Promise<T | null>;
    protected findAll<T>(model: ModelName): Promise<T[]>;
    protected create<T>(model: ModelName, data: any): Promise<T>;
    protected update<T>(model: ModelName, id: number | string, data: any): Promise<T>;
    protected delete<T>(model: ModelName, id: number | string): Promise<T>;
}
export {};

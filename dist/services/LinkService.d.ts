import { PrismaClient } from "@prisma/client";
import { Link, User } from "../types/index.js";
interface LinkWithUser extends Link {
    postedBy: User | null;
}
interface LinkUpdates {
    url?: string;
    description?: string;
}
export declare class LinkService {
    private prisma;
    constructor(prismaClient: PrismaClient);
    getAllLinks(): Promise<LinkWithUser[]>;
    getLinkById(id: string | number): Promise<LinkWithUser | null>;
    createLink(url: string, description: string, userId: number): Promise<LinkWithUser>;
    updateLink(id: string | number, updates: LinkUpdates): Promise<LinkWithUser>;
    deleteLink(id: string | number): Promise<LinkWithUser>;
}
export {};

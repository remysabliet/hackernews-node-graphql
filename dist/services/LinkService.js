export class LinkService {
    constructor(prismaClient) {
        if (!prismaClient) {
            throw new Error("PrismaClient is required");
        }
        this.prisma = prismaClient;
    }
    async getAllLinks() {
        return this.prisma.link.findMany({
            include: {
                postedBy: true
            }
        });
    }
    async getLinkById(id) {
        return this.prisma.link.findUnique({
            where: { id: parseInt(id) },
            include: {
                postedBy: true
            }
        });
    }
    async createLink(url, description, userId) {
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
    async updateLink(id, updates) {
        return this.prisma.link.update({
            where: { id: parseInt(id) },
            data: updates,
            include: {
                postedBy: true
            }
        });
    }
    async deleteLink(id) {
        return this.prisma.link.delete({
            where: { id: parseInt(id) },
            include: {
                postedBy: true
            }
        });
    }
}

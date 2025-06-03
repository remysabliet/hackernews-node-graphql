export class LinkRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapPrismaLinkToLink(link) {
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
    async findAll() {
        const links = await this.prisma.link.findMany({
            include: {
                postedBy: true,
                voters: true
            }
        });
        return links.map(this.mapPrismaLinkToLink);
    }
    async findById(id) {
        const link = await this.prisma.link.findUnique({
            where: { id: parseInt(id) },
            include: {
                postedBy: true,
                voters: true
            }
        });
        if (!link)
            return null;
        return this.mapPrismaLinkToLink(link);
    }
    async create(data) {
        const link = await this.prisma.link.create({
            data: {
                url: data.url,
                description: data.description,
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
    async update(id, data) {
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
    async delete(id) {
        const link = await this.prisma.link.delete({
            where: { id: parseInt(id) },
            include: {
                postedBy: true,
                voters: true
            }
        });
        return this.mapPrismaLinkToLink(link);
    }
    async vote(linkId, userId) {
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
    async findWithFilters(filter) {
        const where = {};
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
        const orderBy = {};
        if (filter.sortBy) {
            if (filter.sortBy === 'votes') {
                orderBy.voters = {
                    _count: filter.sortOrder || 'desc'
                };
            }
            else {
                orderBy[filter.sortBy] = filter.sortOrder || 'desc';
            }
        }
        const links = await this.prisma.link.findMany({
            where,
            orderBy,
            include: {
                postedBy: true,
                voters: true
            }
        });
        // Filter by minimum votes count after fetching
        if (filter.minVotes) {
            return links
                .filter(link => link.voters.length >= filter.minVotes)
                .map(this.mapPrismaLinkToLink);
        }
        return links.map(this.mapPrismaLinkToLink);
    }
}

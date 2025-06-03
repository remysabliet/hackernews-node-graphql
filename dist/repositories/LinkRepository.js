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
        return link ? this.mapPrismaLinkToLink(link) : null;
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
    async findWithFilters(filter, pagination) {
        const where = this.buildWhereClause(filter);
        const orderBy = this.buildOrderByClause(filter);
        // Handle cursor-based pagination
        const cursor = pagination.cursor ? { id: parseInt(pagination.cursor) } : undefined;
        // Get paginated results
        const links = await this.prisma.link.findMany({
            where,
            orderBy: {
                id: 'asc'
            },
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
            filteredLinks = items.filter(link => link.voters.length >= filter.minVotes);
        }
        const paginationInfo = {
            take: pagination.take,
            cursor: hasNextPage ? items[items.length - 1].id.toString() : undefined,
            hasNextPage
        };
        return {
            items: filteredLinks.map(this.mapPrismaLinkToLink),
            pagination: paginationInfo
        };
    }
    buildWhereClause(filter) {
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
        return where;
    }
    buildOrderByClause(filter) {
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
        return orderBy;
    }
}

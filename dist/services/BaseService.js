export class BaseService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    async findById(model, id) {
        const modelClient = this.prisma[model.toLowerCase()];
        return modelClient.findUnique({
            where: { id: typeof id === 'string' ? parseInt(id) : id }
        });
    }
    async findAll(model) {
        const modelClient = this.prisma[model.toLowerCase()];
        return modelClient.findMany();
    }
    async create(model, data) {
        const modelClient = this.prisma[model.toLowerCase()];
        return modelClient.create({ data });
    }
    async update(model, id, data) {
        const modelClient = this.prisma[model.toLowerCase()];
        return modelClient.update({
            where: { id: typeof id === 'string' ? parseInt(id) : id },
            data
        });
    }
    async delete(model, id) {
        const modelClient = this.prisma[model.toLowerCase()];
        return modelClient.delete({
            where: { id: typeof id === 'string' ? parseInt(id) : id }
        });
    }
}
//# sourceMappingURL=BaseService.js.map
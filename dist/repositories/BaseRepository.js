export class BaseRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const modelClient = this.prisma[this.modelName.toLowerCase()];
        return modelClient.findMany();
    }
    async findById(id) {
        const modelClient = this.prisma[this.modelName.toLowerCase()];
        return modelClient.findUnique({
            where: { id: typeof id === 'string' ? parseInt(id) : id }
        });
    }
    async create(data) {
        const modelClient = this.prisma[this.modelName.toLowerCase()];
        return modelClient.create({ data });
    }
    async update(id, data) {
        const modelClient = this.prisma[this.modelName.toLowerCase()];
        return modelClient.update({
            where: { id: typeof id === 'string' ? parseInt(id) : id },
            data
        });
    }
    async delete(id) {
        const modelClient = this.prisma[this.modelName.toLowerCase()];
        return modelClient.delete({
            where: { id: typeof id === 'string' ? parseInt(id) : id }
        });
    }
}

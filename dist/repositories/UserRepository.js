import { BaseRepository } from "./BaseRepository.js";
export class UserRepository extends BaseRepository {
    constructor(prisma) {
        super(prisma);
        this.modelName = 'User';
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: {
                links: true
            }
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            include: {
                links: true
            }
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id: typeof id === 'string' ? parseInt(id) : id },
            include: {
                links: true
            }
        });
    }
}

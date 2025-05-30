import { BaseService } from "./BaseService.js";
import bcrypt from "bcryptjs";
export class UserService extends BaseService {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async createUser(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.userRepository.create({
            ...data,
            password: hashedPassword
        });
    }
    async validatePassword(user, password) {
        return bcrypt.compare(password, user.password);
    }
}

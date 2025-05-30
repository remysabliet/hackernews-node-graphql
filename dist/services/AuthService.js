import jwt from "jsonwebtoken";
export class AuthService {
    constructor(prisma, jwtSecret, userService) {
        this.prisma = prisma;
        this.jwtSecret = jwtSecret;
        this.userService = userService;
    }
    async signup(data) {
        const user = await this.userService.createUser(data);
        const token = this.generateToken(user);
        return { token, user };
    }
    async login(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            throw new Error("No user found with this email");
        }
        const valid = await this.userService.validatePassword(user, data.password);
        if (!valid) {
            throw new Error("Invalid password");
        }
        const token = this.generateToken(user);
        return { token, user };
    }
    async getUserFromToken(token) {
        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            const user = await this.userService.getById(decoded.userId);
            return user;
        }
        catch {
            return null;
        }
    }
    generateToken(user) {
        return jwt.sign({ userId: user.id }, this.jwtSecret);
    }
}

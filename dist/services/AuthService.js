import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export class AuthService {
    constructor(prisma, jwtSecret) {
        this.prisma = prisma;
        this.jwtSecret = jwtSecret;
    }
    async signup({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            include: {
                links: true
            }
        });
        const token = this.generateToken(user);
        return { token, user: this.mapToGraphQLUser(user) };
    }
    async login({ email, password }) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                links: true
            }
        });
        if (!user) {
            throw new Error("No user found with this email");
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid password");
        }
        const token = this.generateToken(user);
        return { token, user: this.mapToGraphQLUser(user) };
    }
    async getUserFromToken(token) {
        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            const user = await this.prisma.user.findUnique({
                where: { id: decoded.userId },
                include: {
                    links: true
                }
            });
            return user ? this.mapToGraphQLUser(user) : null;
        }
        catch {
            return null;
        }
    }
    generateToken(user) {
        return jwt.sign({ userId: user.id }, this.jwtSecret);
    }
    mapToGraphQLUser(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}

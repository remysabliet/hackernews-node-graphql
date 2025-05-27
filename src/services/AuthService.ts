import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { User } from "../graphql/types/User.js";
import { SignupArgs, LoginArgs, AuthResponse } from "../types/interfaces.js";

export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwtSecret: string
  ) {}

  async signup({ name, email, password }: SignupArgs): Promise<AuthResponse> {
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

  async login({ email, password }: LoginArgs): Promise<AuthResponse> {
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

  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: number };
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          links: true
        }
      });
      return user ? this.mapToGraphQLUser(user) : null;
    } catch {
      return null;
    }
  }

  private generateToken(user: any): string {
    return jwt.sign({ userId: user.id }, this.jwtSecret);
  }

  private mapToGraphQLUser(user: any): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
} 
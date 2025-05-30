import { PrismaClient } from "@prisma/client";
import { User } from "../graphql/types/User.js";
import { UserService } from "./UserService.js";
import { UserRepository } from "../repositories/UserRepository.js";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  token: string;
  user: User;
}

export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwtSecret: string,
    private userService: UserService
  ) {}

  async signup(data: { name: string; email: string; password: string }): Promise<AuthPayload> {
    const user = await this.userService.createUser(data);
    const token = this.generateToken(user);
    return { token, user };
  }

  async login(data: { email: string; password: string }): Promise<AuthPayload> {
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

  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: number };
      const user = await this.userService.getById(decoded.userId);
      return user;
    } catch {
      return null;
    }
  }

  private generateToken(user: User): string {
    return jwt.sign({ userId: user.id }, this.jwtSecret);
  }
} 
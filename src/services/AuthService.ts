import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { User } from "../types/index.js";
import { SignupArgs, LoginArgs, AuthResponse } from "../types/interfaces.js";

export class AuthService {
  private prisma: PrismaClient;
  private jwtSecret: string;

  constructor(prismaClient: PrismaClient, jwtSecret: string) {
    this.prisma = prismaClient;
    this.jwtSecret = jwtSecret;
  }

  async signup(args: SignupArgs): Promise<AuthResponse> {
    const password = await bcrypt.hash(args.password, 10);

    const user = await this.prisma.user.create({ data: { ...args, password } });

    const token = jwt.sign({ userId: user.id }, this.jwtSecret);

    return {
      token,
      user,
    };
  }

  async login({ email, password }: LoginArgs): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, this.jwtSecret);

    return {
      token,
      user,
    };
  }

  async getUserFromToken(token: string): Promise<User> {
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: number };
      const userId = decoded.userId;
      if (!userId) {
        throw new Error("Invalid token payload");
      }
      // Fetch user by ID
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("No such user found");
      }
      return user;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
} 
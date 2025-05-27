import { PrismaClient } from "@prisma/client";
import { User } from "../types/index.js";
import { SignupArgs, LoginArgs, AuthResponse } from "../types/interfaces.js";
export declare class AuthService {
    private prisma;
    private jwtSecret;
    constructor(prismaClient: PrismaClient, jwtSecret: string);
    signup(args: SignupArgs): Promise<AuthResponse>;
    login({ email, password }: LoginArgs): Promise<AuthResponse>;
    getUserFromToken(token: string): Promise<User>;
}

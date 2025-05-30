import { PrismaClient } from "@prisma/client";
import { LinkRepository } from "./repositories/LinkRepository.js";
import { UserRepository } from "./repositories/UserRepository.js";
import { LinkService } from "./services/LinkService.js";
import { UserService } from "./services/UserService.js";
import { AuthService } from "./services/AuthService.js";

export class Container {
  private static instance: Container;
  private prisma: PrismaClient;
  private userService: UserService;
  private linkService: LinkService;
  private authService: AuthService;

  private constructor() {
    this.prisma = new PrismaClient();
    const userRepository = new UserRepository(this.prisma);
    const linkRepository = new LinkRepository(this.prisma);
    
    this.userService = new UserService(userRepository);
    this.linkService = new LinkService(linkRepository);
    this.authService = new AuthService(
      this.prisma,
      process.env.JWT_SECRET || 'your-secret-key',
      this.userService
    );
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  getLinkService(): LinkService {
    return this.linkService;
  }

  getUserService(): UserService {
    return this.userService;
  }

  getAuthService(): AuthService {
    return this.authService;
  }

  getPrisma(): PrismaClient {
    return this.prisma;
  }
} 
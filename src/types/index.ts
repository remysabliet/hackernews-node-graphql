import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/AuthService.js';
import { LinkService } from '../services/LinkService.js';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Link {
  id: number;
  url: string;
  description: string;
  createdAt: Date;
  postedById: number | null;
}

export interface LinkWithUser extends Omit<Link, 'postedById'> {
  postedBy: User | null;
}

export interface Context {
  user?: User;
  prisma: PrismaClient;
  linkService: LinkService;
  authService: AuthService;
}

export interface AuthContext {
  user?: User;
}

export interface ResolverContext {
  req: {
    headers: {
      authorization?: string;
    };
  };
} 
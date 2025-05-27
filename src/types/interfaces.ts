import { User } from "./index.js";

// Auth related interfaces
export interface SignupArgs {
  name: string;
  email: string;
  password: string;
}

export interface LoginArgs {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Resolver related interfaces
export interface ResolverParent {
  id: number;
  [key: string]: any;
}

export interface ResolverArgs {
  id?: string | number;
  url?: string;
  description?: string;
  name?: string;
  email?: string;
  password?: string;
  [key: string]: any;
}

export interface ResolverInfo {
  fieldName: string;
  [key: string]: any;
}

export interface ResolverContext {
  req: {
    headers: {
      authorization?: string;
    };
  };
  user?: User | null;
  prisma: any;
  linkService: any;
  authService: any;
}

export type ResolverFn = (
  parent: ResolverParent,
  args: ResolverArgs,
  context: ResolverContext,
  info: ResolverInfo
) => Promise<any> | any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: ResolverFn;
  };
} 
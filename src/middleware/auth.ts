import { MiddlewareFn } from "type-graphql";
import { ResolverContext } from "../types/interfaces.js";
import { User } from "../graphql/types/User.js";
import jwt from "jsonwebtoken";

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

/**
 * Authentication middleware for GraphQL resolvers
 * Ensures that the user is authenticated before proceeding with the resolver
 * @throws {Error} If user is not authenticated
 */
export const auth: MiddlewareFn<ResolverContext> = async ({ context }, next) => {
  if (!context.user) {
    throw new Error("Authentication required");
  }
  return next();
};

/**
 * Verifies and decodes a JWT token
 * @param {string} token - JWT token to verify
 * @returns {User} Decoded user information
 * @throws {Error} If token is invalid or expired
 */
export const getTokenPayload = (token: string): User => {
  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw new Error("Token verification failed");
  }
}; 
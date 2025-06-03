import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";

import type { ResolverContext } from "../../types/interfaces.js";

import { User } from "../types/User.js";
import { AuthPayload } from "../types/AuthPayload.js";
import { LoginInput, SignupInput } from "../types/inputs.js";
import { AuthService } from "../../services/AuthService.js";
import { auth } from "../../middleware/auth.js";
import { validateEmail, validatePassword } from "../../utils/validation.js";

@Resolver(User)
export class UserResolver {
  constructor(private authService: AuthService) { }

  @Query(() => User)
  @UseMiddleware(auth)
  async me(@Ctx() { user }: ResolverContext): Promise<User> {
    if (!user) {
      throw new Error("Not authenticated");
    }
    return user;
  }

  @Mutation(() => AuthPayload)
  async signup(
    @Arg("input") input: SignupInput,
    @Ctx() { prisma }: ResolverContext
  ): Promise<AuthPayload> {
    validateEmail(input.email);
    validatePassword(input.password);

    return this.authService.signup({
      name: input.name,
      email: input.email,
      password: input.password
    });
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg("input") input: LoginInput,
    @Ctx() { prisma }: ResolverContext
  ): Promise<AuthPayload> {
    validateEmail(input.email);

    return this.authService.login({
      email: input.email,
      password: input.password
    });
  }
} 
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../types/User.js";
import { AuthPayload } from "../types/AuthPayload.js";
import { LoginInput, SignupInput } from "../types/inputs.js";
import { AuthService } from "../../services/AuthService.js";
import { auth } from "../../middleware/auth.js";
import { validateEmail, validatePassword } from "../../utils/validation.js";
let UserResolver = class UserResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async me({ user }) {
        if (!user) {
            throw new Error("Not authenticated");
        }
        return user;
    }
    async signup(input, { prisma }) {
        validateEmail(input.email);
        validatePassword(input.password);
        return this.authService.signup({
            name: input.name,
            email: input.email,
            password: input.password
        });
    }
    async login(input, { prisma }) {
        validateEmail(input.email);
        return this.authService.login({
            email: input.email,
            password: input.password
        });
    }
};
__decorate([
    Query(() => User),
    UseMiddleware(auth),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    Mutation(() => AuthPayload),
    __param(0, Arg("input")),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignupInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signup", null);
__decorate([
    Mutation(() => AuthPayload),
    __param(0, Arg("input")),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    Resolver(User),
    __metadata("design:paramtypes", [AuthService])
], UserResolver);
export { UserResolver };

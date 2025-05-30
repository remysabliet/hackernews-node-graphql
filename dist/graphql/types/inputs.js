var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { InputType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
let LoginInput = class LoginInput {
};
__decorate([
    Field(),
    IsEmail(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    Field(),
    MinLength(6),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    InputType()
], LoginInput);
export { LoginInput };
let SignupInput = class SignupInput {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], SignupInput.prototype, "name", void 0);
__decorate([
    Field(),
    IsEmail(),
    __metadata("design:type", String)
], SignupInput.prototype, "email", void 0);
__decorate([
    Field(),
    MinLength(6),
    __metadata("design:type", String)
], SignupInput.prototype, "password", void 0);
SignupInput = __decorate([
    InputType()
], SignupInput);
export { SignupInput };

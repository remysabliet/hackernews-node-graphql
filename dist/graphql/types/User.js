var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field, ID } from "type-graphql";
import { Link } from "./Link.js";
/**
 * User entity representing a registered user in the system
 * @class User
 */
let User = class User {
};
__decorate([
    Field(() => ID),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Field(() => [Link], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "links", void 0);
__decorate([
    Field(() => [Link], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "votes", void 0);
User = __decorate([
    ObjectType()
], User);
export { User };

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
import { User } from "./User.js";
let Link = class Link {
};
__decorate([
    Field(() => ID),
    __metadata("design:type", Number)
], Link.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Link.prototype, "url", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Link.prototype, "description", void 0);
__decorate([
    Field(() => Date) // This will use our custom Date scalar
    ,
    __metadata("design:type", Date)
], Link.prototype, "createdAt", void 0);
__decorate([
    Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], Link.prototype, "postedBy", void 0);
__decorate([
    Field(() => ID, { nullable: true }),
    __metadata("design:type", Number)
], Link.prototype, "postedById", void 0);
__decorate([
    Field(() => [User], { nullable: true }),
    __metadata("design:type", Array)
], Link.prototype, "voters", void 0);
Link = __decorate([
    ObjectType()
], Link);
export { Link };

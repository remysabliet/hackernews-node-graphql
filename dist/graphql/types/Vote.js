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
import { Link } from "./Link.js";
let Vote = class Vote {
};
__decorate([
    Field(() => ID),
    __metadata("design:type", Number)
], Vote.prototype, "id", void 0);
__decorate([
    Field(() => Link),
    __metadata("design:type", Link)
], Vote.prototype, "link", void 0);
__decorate([
    Field(() => User),
    __metadata("design:type", User)
], Vote.prototype, "user", void 0);
Vote = __decorate([
    ObjectType()
], Vote);
export { Vote };

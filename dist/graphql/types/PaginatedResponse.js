var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field, Int, ID } from "type-graphql";
let PaginationInfo = class PaginationInfo {
};
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "take", void 0);
__decorate([
    Field(() => ID, { nullable: true }),
    __metadata("design:type", String)
], PaginationInfo.prototype, "cursor", void 0);
__decorate([
    Field(() => Boolean),
    __metadata("design:type", Boolean)
], PaginationInfo.prototype, "hasNextPage", void 0);
PaginationInfo = __decorate([
    ObjectType()
], PaginationInfo);
export { PaginationInfo };
export function PaginatedResponse(TItemClass) {
    let PaginatedResponseClass = class PaginatedResponseClass {
    };
    __decorate([
        Field(() => [TItemClass]),
        __metadata("design:type", Array)
    ], PaginatedResponseClass.prototype, "items", void 0);
    __decorate([
        Field(() => PaginationInfo),
        __metadata("design:type", PaginationInfo)
    ], PaginatedResponseClass.prototype, "pagination", void 0);
    PaginatedResponseClass = __decorate([
        ObjectType()
    ], PaginatedResponseClass);
    return PaginatedResponseClass;
}

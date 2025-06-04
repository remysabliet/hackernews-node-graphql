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
let SortInput = class SortInput {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], SortInput.prototype, "field", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], SortInput.prototype, "order", void 0);
SortInput = __decorate([
    InputType()
], SortInput);
export { SortInput };
let LinkFilter = class LinkFilter {
};
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], LinkFilter.prototype, "search", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", Number)
], LinkFilter.prototype, "postedById", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", Number)
], LinkFilter.prototype, "minVotes", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", Date)
], LinkFilter.prototype, "startDate", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", Date)
], LinkFilter.prototype, "endDate", void 0);
__decorate([
    Field(() => [SortInput], { nullable: true }),
    __metadata("design:type", Array)
], LinkFilter.prototype, "sort", void 0);
LinkFilter = __decorate([
    InputType()
], LinkFilter);
export { LinkFilter };

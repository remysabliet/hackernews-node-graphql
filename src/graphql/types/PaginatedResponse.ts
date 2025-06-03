import { ObjectType, Field, Int, ClassType, ID } from "type-graphql";

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  take: number;

  @Field(() => ID, { nullable: true })
  cursor?: string;

  @Field(() => Boolean)
  hasNextPage: boolean;
}

export function PaginatedResponse<TItem extends object>(TItemClass: ClassType<TItem>) {
  @ObjectType()
  class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items: TItem[];

    @Field(() => PaginationInfo)
    pagination: PaginationInfo;
  }

  return PaginatedResponseClass;
} 
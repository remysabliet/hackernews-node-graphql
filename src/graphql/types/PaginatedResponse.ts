import { ObjectType, Field, Int, ClassType, ID } from "type-graphql";

@ObjectType()
export class PaginationInfo {

  // Take: The maximum number of records to fetch 
  // in a single query (equivalent to LIMIT in SQL).
  @Field(() => Int)
  take: number;

  // Cursor: The ID of the last record you currently have; used
  // to fetch the next batch starting after that record. 
  // For the first page, cursor is null.
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
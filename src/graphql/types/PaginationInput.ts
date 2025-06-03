import { InputType, Field, Int, ID } from "type-graphql";

@InputType()
export class PaginationInput {
  @Field(() => ID, { nullable: true })
  cursor?: string;

  @Field(() => Int, { defaultValue: 10 })
  take: number = 10;
} 
import { InputType, Field } from "type-graphql";

@InputType()
export class SortInput {
  @Field(() => String)
  field: "createdAt" | "votes" | "url" | "description";

  @Field(() => String)
  order: "asc" | "desc";
}

@InputType()
export class LinkFilter {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  postedById?: number;

  @Field({ nullable: true })
  minVotes?: number;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => [SortInput], { nullable: true })
  sort?: SortInput[];
} 
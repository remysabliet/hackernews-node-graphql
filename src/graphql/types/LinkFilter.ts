import { InputType, Field } from "type-graphql";

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

  @Field({ nullable: true })
  sortBy?: "createdAt" | "votes";

  @Field({ nullable: true })
  sortOrder?: "asc" | "desc";
} 
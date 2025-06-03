import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User.js";

@ObjectType()
export class Link {
  @Field(() => ID)
  id: number;

  @Field()
  url: string;

  @Field()
  description: string;

  @Field(() => Date) // This will use our custom Date scalar
  createdAt: Date;

  @Field(() => User, { nullable: true })
  postedBy?: User;

  @Field(() => ID, { nullable: true })
  postedById?: number;

  @Field(() => [User], { nullable: true })
  voters?: User[];
} 
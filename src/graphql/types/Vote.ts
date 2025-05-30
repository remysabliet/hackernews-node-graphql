import { ObjectType, Field, ID } from "type-graphql";

import { User } from "./User.js";
import { Link } from "./Link.js";


@ObjectType()
export class Vote {
  @Field(() => ID)
  id!: number;

  @Field(() => Link)
  link!: Link;

  @Field(() => User)
  user!: User;
}
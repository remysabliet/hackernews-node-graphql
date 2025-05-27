import { ObjectType, Field } from "type-graphql";
import { User } from "./User.js";

@ObjectType()
export class AuthPayload {
  @Field()
  token!: string;

  @Field(() => User)
  user!: User;
} 
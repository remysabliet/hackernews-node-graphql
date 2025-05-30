import { ObjectType, Field, ID } from "type-graphql";
import { Link } from "./Link.js";

/**
 * User entity representing a registered user in the system
 * @class User
 */
@ObjectType()
export class User {
  /**
   * Unique identifier for the user
   * @type {number}
   */
  @Field(() => ID)
  id: number;

  /**
   * User's display name
   * @type {string}
   */
  @Field({ nullable: true })
  name?: string;

  /**
   * User's email address (unique)
   * @type {string}
   */
  @Field({ nullable: true })
  email?: string;

  /**
   * 
   * @type {string[]}
   */
  @Field(() => [Link], { nullable: true })
  links?: Link[];

  /**
 * 
 * @type {string[]}
 */
  @Field(() => [Link], { nullable: true })
  votes?: Link[];
}

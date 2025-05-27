import { ObjectType, Field, ID } from "type-graphql";

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
  @Field()
  name: string;

  /**
   * User's email address (unique)
   * @type {string}
   */
  @Field()
  email: string;
}

function LinkType() {
  return require("./Link.js").Link;
} 
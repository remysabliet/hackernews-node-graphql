import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User.js";

/**
 * Link entity representing a news link in the system
 * @class Link
 */
@ObjectType()
export class Link {
  /**
   * Unique identifier for the link
   * @type {number}
   */
  @Field(() => ID)
  id: number;

  /**
   * URL of the link
   * @type {string}
   */
  @Field()
  url: string;

  /**
   * Description of the link
   * @type {string}
   */
  @Field()
  description: string;

  /**
   * Creation timestamp of the link
   * @type {Date}
   */
  @Field()
  createdAt: Date;

  /**
   * User who posted the link
   * @type {User}
   */
  @Field(() => User, { nullable: true })
  postedBy?: User;
} 
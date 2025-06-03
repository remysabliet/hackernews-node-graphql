import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User.js";
import { CustomDateScalar } from "../scalars/CustomDateScalar.js";

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
   * Creation timestamp of the link - now uses custom Date scalar
   * @type {Date}
   */
  @Field(() => CustomDateScalar) // Explicitly use our custom scalar
  createdAt: Date;

  /**
   * User who posted the link
   * @type {User}
   */
  @Field(() => User, { nullable: true })
  postedBy?: User;

  /**
   * User who posted the link
   * @type {number}
   */
  @Field(() => ID, { nullable: true })
  postedById?: number;

  /**
   * Users who voted for the link
   * @type {[User]}
   */
  @Field(() => [User], { nullable: true })
  voters?: User[];
} 
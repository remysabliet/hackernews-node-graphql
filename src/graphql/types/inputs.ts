import { InputType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(6)
  password!: string;
}

@InputType()
export class SignupInput {
  @Field()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(6)
  password!: string;
} 
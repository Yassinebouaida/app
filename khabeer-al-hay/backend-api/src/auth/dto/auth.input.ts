import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsPhoneNumber, IsEnum } from 'class-validator';
import { UserType } from '@prisma/client';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsPhoneNumber('SA') // Saudi Arabia phone number format
  phone: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field(() => UserType)
  @IsEnum(UserType)
  userType: UserType;
}

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  emailOrPhone: string;

  @Field()
  @IsString()
  password: string;
}
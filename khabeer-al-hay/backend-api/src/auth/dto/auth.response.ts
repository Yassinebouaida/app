import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@ObjectType()
export class UserResponse {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => UserType)
  userType: UserType;

  @Field()
  isVerified: boolean;

  @Field({ nullable: true })
  avatar?: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;

  @Field(() => UserResponse)
  user: UserResponse;
}
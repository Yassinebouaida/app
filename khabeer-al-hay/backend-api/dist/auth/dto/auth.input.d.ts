import { UserType } from '@prisma/client';
export declare class RegisterInput {
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: UserType;
}
export declare class LoginInput {
    emailOrPhone: string;
    password: string;
}

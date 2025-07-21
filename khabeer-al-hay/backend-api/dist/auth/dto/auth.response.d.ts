import { UserType } from '@prisma/client';
export declare class UserResponse {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    isVerified: boolean;
    avatar?: string;
}
export declare class AuthResponse {
    token: string;
    user: UserResponse;
}

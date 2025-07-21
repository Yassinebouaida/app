import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
export interface JwtPayload {
    sub: string;
    email: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(payload: JwtPayload): Promise<{
        email: string;
        phone: string;
        password: string;
        firstName: string;
        lastName: string;
        userType: import(".prisma/client").$Enums.UserType;
        id: string;
        isVerified: boolean;
        avatar: string | null;
        isActive: boolean;
        latitude: number | null;
        longitude: number | null;
        address: string | null;
        city: string | null;
        district: string | null;
        bio: string | null;
        experience: number | null;
        hourlyRate: number | null;
        isAvailable: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};

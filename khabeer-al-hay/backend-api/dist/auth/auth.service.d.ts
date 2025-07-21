import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../config/prisma.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerInput: RegisterInput): Promise<AuthResponse>;
    login(loginInput: LoginInput): Promise<AuthResponse>;
    validateUser(userId: string): Promise<{
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
    private generateToken;
}

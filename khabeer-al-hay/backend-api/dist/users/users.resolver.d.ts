import { UsersService } from './users.service';
import { User } from '@prisma/client';
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    me(user: User): Promise<{
        specialties: ({
            specialty: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                nameAr: string;
                nameEn: string;
                description: string | null;
                icon: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            specialtyId: string;
        })[];
        ratings: {
            rating: number;
            id: string;
            createdAt: Date;
            comment: string | null;
            requestId: string;
            ratedUserId: string;
            giverId: string;
        }[];
    } & {
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
    craftsmen(specialtyId: string, latitude?: number, longitude?: number): Promise<({
        specialties: ({
            specialty: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                nameAr: string;
                nameEn: string;
                description: string | null;
                icon: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            specialtyId: string;
        })[];
        ratings: {
            rating: number;
            id: string;
            createdAt: Date;
            comment: string | null;
            requestId: string;
            ratedUserId: string;
            giverId: string;
        }[];
    } & {
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
    })[]>;
    updateLocation(user: User, latitude: number, longitude: number, address?: string): Promise<{
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
    toggleAvailability(user: User): Promise<{
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

import { PrismaService } from '../config/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
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
    findCraftsmenBySpecialty(specialtyId: string, latitude?: number, longitude?: number): Promise<({
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
    updateProfile(userId: string, updateData: any): Promise<{
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
    updateLocation(userId: string, latitude: number, longitude: number, address?: string): Promise<{
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
    toggleAvailability(userId: string): Promise<{
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

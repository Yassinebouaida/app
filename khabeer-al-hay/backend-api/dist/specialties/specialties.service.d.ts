import { PrismaService } from '../config/prisma.service';
export declare class SpecialtiesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        nameAr: string;
        nameEn: string;
        description: string | null;
        icon: string | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        nameAr: string;
        nameEn: string;
        description: string | null;
        icon: string | null;
    }>;
    create(data: {
        nameAr: string;
        nameEn: string;
        description?: string;
        icon?: string;
    }): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        nameAr: string;
        nameEn: string;
        description: string | null;
        icon: string | null;
    }>;
    update(id: string, data: {
        nameAr?: string;
        nameEn?: string;
        description?: string;
        icon?: string;
    }): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        nameAr: string;
        nameEn: string;
        description: string | null;
        icon: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        nameAr: string;
        nameEn: string;
        description: string | null;
        icon: string | null;
    }>;
    seedSpecialties(): Promise<void>;
}

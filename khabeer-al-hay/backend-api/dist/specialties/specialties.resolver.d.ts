import { SpecialtiesService } from './specialties.service';
export declare class SpecialtiesResolver {
    private specialtiesService;
    constructor(specialtiesService: SpecialtiesService);
    specialties(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        nameAr: string;
        nameEn: string;
        description: string | null;
        icon: string | null;
    }[]>;
}

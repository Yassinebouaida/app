import { RequestsService } from './requests.service';
export declare class RequestsResolver {
    private requestsService;
    constructor(requestsService: RequestsService);
    requests(): Promise<{
        id: string;
        latitude: number;
        longitude: number;
        address: string;
        createdAt: Date;
        updatedAt: Date;
        specialtyId: string;
        description: string;
        title: string;
        images: string[];
        estimatedPrice: number | null;
        finalPrice: number | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        urgency: string | null;
        scheduledAt: Date | null;
        completedAt: Date | null;
        clientId: string;
        acceptedById: string | null;
    }[]>;
}

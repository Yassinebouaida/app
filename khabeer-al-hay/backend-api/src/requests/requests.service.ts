import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { RequestStatus, UserType } from '@prisma/client';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async createServiceRequest(data: {
    title: string;
    description: string;
    images?: string[];
    latitude: number;
    longitude: number;
    address: string;
    estimatedPrice?: number;
    urgency?: string;
    scheduledAt?: Date;
    clientId: string;
    specialtyId: string;
  }) {
    return this.prisma.serviceRequest.create({
      data: {
        title: data.title,
        description: data.description,
        images: data.images || [],
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        estimatedPrice: data.estimatedPrice,
        urgency: data.urgency,
        scheduledAt: data.scheduledAt,
        clientId: data.clientId,
        specialtyId: data.specialtyId,
        status: RequestStatus.PENDING,
      },
      include: {
        client: true,
        specialty: true,
        offers: {
          include: {
            craftsman: true,
          },
        },
      },
    });
  }

  async findAll(filters?: {
    status?: RequestStatus;
    specialtyId?: string;
    city?: string;
    urgency?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const where: any = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.specialtyId) where.specialtyId = filters.specialtyId;
    if (filters?.urgency) where.urgency = filters.urgency;
    if (filters?.minPrice || filters?.maxPrice) {
      where.estimatedPrice = {};
      if (filters.minPrice) where.estimatedPrice.gte = filters.minPrice;
      if (filters.maxPrice) where.estimatedPrice.lte = filters.maxPrice;
    }

    return this.prisma.serviceRequest.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            city: true,
          },
        },
        specialty: true,
        offers: {
          include: {
            craftsman: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                hourlyRate: true,
                ratings: true,
              },
            },
          },
        },
        acceptedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const request = await this.prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            phone: true,
            city: true,
          },
        },
        specialty: true,
        offers: {
          include: {
            craftsman: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                hourlyRate: true,
                experience: true,
                ratings: true,
                specialties: {
                  include: {
                    specialty: true,
                  },
                },
              },
            },
          },
        },
        acceptedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            phone: true,
          },
        },
        chats: {
          include: {
            messages: {
              include: {
                sender: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                  },
                },
              },
              orderBy: { createdAt: 'asc' },
            },
          },
        },
        rating: true,
        payment: true,
      },
    });

    if (!request) {
      throw new NotFoundException('Service request not found');
    }

    return request;
  }

  async findUserRequests(userId: string, userType: UserType) {
    const where: any = {};

    if (userType === UserType.CLIENT) {
      where.clientId = userId;
    } else if (userType === UserType.CRAFTSMAN) {
      where.acceptedById = userId;
    }

    return this.prisma.serviceRequest.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            city: true,
          },
        },
        specialty: true,
        offers: {
          include: {
            craftsman: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                hourlyRate: true,
              },
            },
          },
        },
        acceptedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        rating: true,
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateRequestStatus(
    requestId: string,
    status: RequestStatus,
    userId: string,
    userType: UserType,
  ) {
    const request = await this.findById(requestId);

    // Check permissions
    if (userType === UserType.CLIENT && request.clientId !== userId) {
      throw new ForbiddenException('You can only update your own requests');
    }

    if (userType === UserType.CRAFTSMAN && request.acceptedById !== userId) {
      throw new ForbiddenException('You can only update requests you accepted');
    }

    const updateData: any = { status };

    if (status === RequestStatus.COMPLETED) {
      updateData.completedAt = new Date();
    }

    return this.prisma.serviceRequest.update({
      where: { id: requestId },
      data: updateData,
      include: {
        client: true,
        specialty: true,
        acceptedBy: true,
      },
    });
  }

  async assignCraftsman(requestId: string, craftsmanId: string) {
    const request = await this.findById(requestId);
    
    if (request.status !== RequestStatus.PENDING) {
      throw new ForbiddenException('Request is not in pending status');
    }

    return this.prisma.serviceRequest.update({
      where: { id: requestId },
      data: {
        acceptedById: craftsmanId,
        status: RequestStatus.ACTIVE,
      },
      include: {
        client: true,
        specialty: true,
        acceptedBy: true,
      },
    });
  }

  async updateRequest(
    requestId: string,
    updateData: {
      title?: string;
      description?: string;
      images?: string[];
      estimatedPrice?: number;
      urgency?: string;
      scheduledAt?: Date;
    },
    userId: string,
  ) {
    const request = await this.findById(requestId);

    if (request.clientId !== userId) {
      throw new ForbiddenException('You can only update your own requests');
    }

    if (request.status !== RequestStatus.PENDING) {
      throw new ForbiddenException('Cannot update request in current status');
    }

    return this.prisma.serviceRequest.update({
      where: { id: requestId },
      data: updateData,
      include: {
        client: true,
        specialty: true,
        offers: true,
      },
    });
  }

  async deleteRequest(requestId: string, userId: string) {
    const request = await this.findById(requestId);

    if (request.clientId !== userId) {
      throw new ForbiddenException('You can only delete your own requests');
    }

    if (request.status !== RequestStatus.PENDING) {
      throw new ForbiddenException('Cannot delete request in current status');
    }

    return this.prisma.serviceRequest.delete({
      where: { id: requestId },
    });
  }

  async findNearbyRequests(
    latitude: number,
    longitude: number,
    radiusKm: number = 10,
    specialtyId?: string,
  ) {
    // Simple distance calculation (can be improved with PostGIS)
    const requests = await this.prisma.serviceRequest.findMany({
      where: {
        status: RequestStatus.PENDING,
        specialtyId,
      },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            city: true,
          },
        },
        specialty: true,
        offers: true,
      },
    });

    // Filter by distance (simplified calculation)
    return requests.filter((request) => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        request.latitude,
        request.longitude,
      );
      return distance <= radiusKm;
    });
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
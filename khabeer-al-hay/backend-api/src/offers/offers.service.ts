import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { OfferStatus, UserType } from '@prisma/client';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async createOffer(data: {
    price: number;
    description: string;
    estimatedTime?: string;
    requestId: string;
    craftsmanId: string;
  }) {
    // Check if request exists and is in pending status
    const request = await this.prisma.serviceRequest.findUnique({
      where: { id: data.requestId },
    });

    if (!request) {
      throw new NotFoundException('Service request not found');
    }

    if (request.status !== 'PENDING') {
      throw new ForbiddenException('Cannot make offer on this request');
    }

    // Check if craftsman already made an offer
    const existingOffer = await this.prisma.offer.findFirst({
      where: {
        requestId: data.requestId,
        craftsmanId: data.craftsmanId,
      },
    });

    if (existingOffer) {
      throw new ConflictException('You have already made an offer on this request');
    }

    return this.prisma.offer.create({
      data: {
        price: data.price,
        description: data.description,
        estimatedTime: data.estimatedTime,
        requestId: data.requestId,
        craftsmanId: data.craftsmanId,
        status: OfferStatus.PENDING,
      },
      include: {
        request: {
          include: {
            client: true,
            specialty: true,
          },
        },
        craftsman: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            experience: true,
            hourlyRate: true,
            ratings: true,
          },
        },
      },
    });
  }

  async findOffersByRequest(requestId: string) {
    return this.prisma.offer.findMany({
      where: { requestId },
      include: {
        craftsman: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            experience: true,
            hourlyRate: true,
            ratings: true,
            specialties: {
              include: {
                specialty: true,
              },
            },
          },
        },
      },
      orderBy: [
        { price: 'asc' },
        { createdAt: 'asc' },
      ],
    });
  }

  async findCraftsmanOffers(craftsmanId: string) {
    return this.prisma.offer.findMany({
      where: { craftsmanId },
      include: {
        request: {
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
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOfferById(id: string) {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
      include: {
        request: {
          include: {
            client: true,
            specialty: true,
          },
        },
        craftsman: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            experience: true,
            hourlyRate: true,
            ratings: true,
          },
        },
      },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    return offer;
  }

  async updateOffer(
    offerId: string,
    updateData: {
      price?: number;
      description?: string;
      estimatedTime?: string;
    },
    craftsmanId: string,
  ) {
    const offer = await this.findOfferById(offerId);

    if (offer.craftsmanId !== craftsmanId) {
      throw new ForbiddenException('You can only update your own offers');
    }

    if (offer.status !== OfferStatus.PENDING) {
      throw new ForbiddenException('Cannot update offer in current status');
    }

    return this.prisma.offer.update({
      where: { id: offerId },
      data: updateData,
      include: {
        request: true,
        craftsman: true,
      },
    });
  }

  async acceptOffer(offerId: string, clientId: string) {
    const offer = await this.findOfferById(offerId);

    if (offer.request.clientId !== clientId) {
      throw new ForbiddenException('You can only accept offers on your own requests');
    }

    if (offer.status !== OfferStatus.PENDING) {
      throw new ForbiddenException('Offer is not in pending status');
    }

    // Update offer status
    await this.prisma.offer.update({
      where: { id: offerId },
      data: { status: OfferStatus.ACCEPTED },
    });

    // Reject all other offers
    await this.prisma.offer.updateMany({
      where: {
        requestId: offer.requestId,
        id: { not: offerId },
      },
      data: { status: OfferStatus.REJECTED },
    });

    // Update request status and assign craftsman
    const updatedRequest = await this.prisma.serviceRequest.update({
      where: { id: offer.requestId },
      data: {
        status: 'ACTIVE',
        acceptedById: offer.craftsmanId,
        finalPrice: offer.price,
      },
      include: {
        client: true,
        specialty: true,
        acceptedBy: true,
      },
    });

    return {
      offer: await this.findOfferById(offerId),
      request: updatedRequest,
    };
  }

  async rejectOffer(offerId: string, clientId: string) {
    const offer = await this.findOfferById(offerId);

    if (offer.request.clientId !== clientId) {
      throw new ForbiddenException('You can only reject offers on your own requests');
    }

    if (offer.status !== OfferStatus.PENDING) {
      throw new ForbiddenException('Offer is not in pending status');
    }

    return this.prisma.offer.update({
      where: { id: offerId },
      data: { status: OfferStatus.REJECTED },
      include: {
        request: true,
        craftsman: true,
      },
    });
  }

  async cancelOffer(offerId: string, craftsmanId: string) {
    const offer = await this.findOfferById(offerId);

    if (offer.craftsmanId !== craftsmanId) {
      throw new ForbiddenException('You can only cancel your own offers');
    }

    if (offer.status !== OfferStatus.PENDING) {
      throw new ForbiddenException('Cannot cancel offer in current status');
    }

    return this.prisma.offer.update({
      where: { id: offerId },
      data: { status: OfferStatus.CANCELLED },
      include: {
        request: true,
        craftsman: true,
      },
    });
  }

  async findBestOffers(requestId: string, limit: number = 5) {
    return this.prisma.offer.findMany({
      where: {
        requestId,
        status: OfferStatus.PENDING,
      },
      include: {
        craftsman: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            experience: true,
            hourlyRate: true,
            ratings: true,
          },
        },
      },
      orderBy: [
        { price: 'asc' },
        { createdAt: 'asc' },
      ],
      take: limit,
    });
  }

  async getOfferStatistics(craftsmanId: string) {
    const offers = await this.prisma.offer.findMany({
      where: { craftsmanId },
    });

    const total = offers.length;
    const pending = offers.filter(o => o.status === OfferStatus.PENDING).length;
    const accepted = offers.filter(o => o.status === OfferStatus.ACCEPTED).length;
    const rejected = offers.filter(o => o.status === OfferStatus.REJECTED).length;
    const cancelled = offers.filter(o => o.status === OfferStatus.CANCELLED).length;

    const totalEarnings = offers
      .filter(o => o.status === OfferStatus.ACCEPTED)
      .reduce((sum, o) => sum + o.price, 0);

    return {
      total,
      pending,
      accepted,
      rejected,
      cancelled,
      totalEarnings,
      acceptanceRate: total > 0 ? (accepted / total) * 100 : 0,
    };
  }
}

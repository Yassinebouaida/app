import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async createRating(data: {
    rating: number;
    comment?: string;
    requestId: string;
    ratedUserId: string;
    giverId: string;
  }) {
    // Validate rating value
    if (data.rating < 1 || data.rating > 5) {
      throw new ForbiddenException('Rating must be between 1 and 5');
    }

    // Check if request exists and is completed
    const request = await this.prisma.serviceRequest.findUnique({
      where: { id: data.requestId },
    });

    if (!request) {
      throw new NotFoundException('Service request not found');
    }

    if (request.status !== RequestStatus.COMPLETED) {
      throw new ForbiddenException('Cannot rate incomplete requests');
    }

    // Check if rating already exists
    const existingRating = await this.prisma.rating.findUnique({
      where: { requestId: data.requestId },
    });

    if (existingRating) {
      throw new ConflictException('Request has already been rated');
    }

    // Check if giver is the client of the request
    if (request.clientId !== data.giverId) {
      throw new ForbiddenException('Only the client can rate the service');
    }

    // Check if rated user is the accepted craftsman
    if (request.acceptedById !== data.ratedUserId) {
      throw new ForbiddenException('Can only rate the craftsman who completed the service');
    }

    return this.prisma.rating.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        requestId: data.requestId,
        ratedUserId: data.ratedUserId,
        giverId: data.giverId,
      },
      include: {
        request: {
          include: {
            client: true,
            specialty: true,
          },
        },
        ratedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        giver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findRatingByRequest(requestId: string) {
    return this.prisma.rating.findUnique({
      where: { requestId },
      include: {
        ratedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        giver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        request: {
          include: {
            specialty: true,
          },
        },
      },
    });
  }

  async findUserRatings(userId: string) {
    return this.prisma.rating.findMany({
      where: { ratedUserId: userId },
      include: {
        request: {
          include: {
            specialty: true,
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        giver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findUserRatingStats(userId: string) {
    const ratings = await this.prisma.rating.findMany({
      where: { ratedUserId: userId },
    });

    if (ratings.length === 0) {
      return {
        totalRatings: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        totalComments: 0,
      };
    }

    const totalRatings = ratings.length;
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;
    
    const ratingDistribution = {
      1: ratings.filter(r => r.rating === 1).length,
      2: ratings.filter(r => r.rating === 2).length,
      3: ratings.filter(r => r.rating === 3).length,
      4: ratings.filter(r => r.rating === 4).length,
      5: ratings.filter(r => r.rating === 5).length,
    };

    const totalComments = ratings.filter(r => r.comment).length;

    return {
      totalRatings,
      averageRating: Math.round(averageRating * 100) / 100,
      ratingDistribution,
      totalComments,
    };
  }

  async updateRating(
    requestId: string,
    updateData: {
      rating?: number;
      comment?: string;
    },
    giverId: string,
  ) {
    const rating = await this.findRatingByRequest(requestId);

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    if (rating.giverId !== giverId) {
      throw new ForbiddenException('You can only update your own ratings');
    }

    if (updateData.rating && (updateData.rating < 1 || updateData.rating > 5)) {
      throw new ForbiddenException('Rating must be between 1 and 5');
    }

    return this.prisma.rating.update({
      where: { requestId },
      data: updateData,
      include: {
        request: true,
        ratedUser: true,
        giver: true,
      },
    });
  }

  async deleteRating(requestId: string, giverId: string) {
    const rating = await this.findRatingByRequest(requestId);

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    if (rating.giverId !== giverId) {
      throw new ForbiddenException('You can only delete your own ratings');
    }

    return this.prisma.rating.delete({
      where: { requestId },
    });
  }

  async findTopRatedCraftsmen(limit: number = 10) {
    const ratings = await this.prisma.rating.findMany({
      include: {
        ratedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            experience: true,
            hourlyRate: true,
            specialties: {
              include: {
                specialty: true,
              },
            },
          },
        },
        request: {
          include: {
            specialty: true,
          },
        },
      },
    });

    // Group by user and calculate average rating
    const userRatings = new Map();
    
    ratings.forEach(rating => {
      const userId = rating.ratedUserId;
      if (!userRatings.has(userId)) {
        userRatings.set(userId, {
          user: rating.ratedUser,
          ratings: [],
          totalRating: 0,
          count: 0,
        });
      }
      
      const userData = userRatings.get(userId);
      userData.ratings.push(rating.rating);
      userData.totalRating += rating.rating;
      userData.count += 1;
    });

    // Calculate averages and sort
    const topRated = Array.from(userRatings.values())
      .map(userData => ({
        ...userData.user,
        averageRating: userData.totalRating / userData.count,
        totalRatings: userData.count,
        recentRatings: userData.ratings.slice(-5), // Last 5 ratings
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, limit);

    return topRated;
  }

  async findRecentRatings(limit: number = 20) {
    return this.prisma.rating.findMany({
      include: {
        ratedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        giver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        request: {
          include: {
            specialty: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async searchRatingsByComment(searchTerm: string, limit: number = 20) {
    return this.prisma.rating.findMany({
      where: {
        comment: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      include: {
        ratedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        giver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        request: {
          include: {
            specialty: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}

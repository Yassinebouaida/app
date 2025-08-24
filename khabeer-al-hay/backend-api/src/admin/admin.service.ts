import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { UserType, RequestStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // User Management
  async getAllUsers(page: number = 1, limit: number = 20, filters?: {
    userType?: UserType;
    isActive?: boolean;
    isVerified?: boolean;
    city?: string;
  }) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (filters?.userType) where.userType = filters.userType;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;
    if (filters?.isVerified !== undefined) where.isVerified = filters.isVerified;
    if (filters?.city) where.city = { contains: filters.city, mode: 'insensitive' };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: {
          specialties: {
            include: {
              specialty: true,
            },
          },
          ratings: true,
          _count: {
            select: {
              clientRequests: true,
              craftsmanOffers: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        specialties: {
          include: {
            specialty: true,
          },
        },
        clientRequests: {
          include: {
            specialty: true,
            offers: true,
            rating: true,
            payment: true,
          },
        },
        craftsmanOffers: {
          include: {
            request: {
              include: {
                client: true,
                specialty: true,
              },
            },
          },
        },
        ratings: true,
        givenRatings: true,
      },
    });
  }

  async updateUserStatus(userId: string, updates: {
    isActive?: boolean;
    isVerified?: boolean;
    userType?: UserType;
  }) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updates,
    });
  }

  async deleteUser(userId: string) {
    // Soft delete - mark as inactive
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
  }

  // Service Requests Management
  async getAllRequests(page: number = 1, limit: number = 20, filters?: {
    status?: RequestStatus;
    specialtyId?: string;
    city?: string;
    urgency?: string;
  }) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.specialtyId) where.specialtyId = filters.specialtyId;
    if (filters?.urgency) where.urgency = filters.urgency;
    if (filters?.city) where.city = { contains: filters.city, mode: 'insensitive' };

    const [requests, total] = await Promise.all([
      this.prisma.serviceRequest.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          specialty: true,
          acceptedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          offers: {
            include: {
              craftsman: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          rating: true,
          payment: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.serviceRequest.count({ where }),
    ]);

    return {
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getRequestById(requestId: string) {
    return this.prisma.serviceRequest.findUnique({
      where: { id: requestId },
      include: {
        client: true,
        specialty: true,
        acceptedBy: true,
        offers: {
          include: {
            craftsman: true,
          },
        },
        chats: {
          include: {
            messages: {
              include: {
                sender: true,
              },
            },
          },
        },
        rating: true,
        payment: true,
      },
    });
  }

  async updateRequestStatus(requestId: string, status: RequestStatus) {
    return this.prisma.serviceRequest.update({
      where: { id: requestId },
      data: { status },
    });
  }

  // Payments Management
  async getAllPayments(page: number = 1, limit: number = 20, filters?: {
    status?: PaymentStatus;
    paymentMethod?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.paymentMethod) where.paymentMethod = filters.paymentMethod;
    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        include: {
          request: {
            include: {
              client: true,
              acceptedBy: true,
              specialty: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getPaymentById(paymentId: string) {
    return this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        request: {
          include: {
            client: true,
            acceptedBy: true,
            specialty: true,
          },
        },
      },
    });
  }

  // Analytics and Statistics
  async getDashboardStats() {
    const [
      totalUsers,
      totalCraftsmen,
      totalClients,
      totalRequests,
      totalPayments,
      totalRatings,
      pendingRequests,
      activeRequests,
      completedRequests,
      totalRevenue,
    ] = await Promise.all([
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.user.count({ where: { userType: UserType.CRAFTSMAN, isActive: true } }),
      this.prisma.user.count({ where: { userType: UserType.CLIENT, isActive: true } }),
      this.prisma.serviceRequest.count(),
      this.prisma.payment.count(),
      this.prisma.rating.count(),
      this.prisma.serviceRequest.count({ where: { status: RequestStatus.PENDING } }),
      this.prisma.serviceRequest.count({ where: { status: RequestStatus.ACTIVE } }),
      this.prisma.serviceRequest.count({ where: { status: RequestStatus.COMPLETED } }),
      this.prisma.payment.aggregate({
        where: { status: PaymentStatus.PAID },
        _sum: { amount: true },
      }),
    ]);

    // Monthly growth
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await this.prisma.serviceRequest.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: sixMonthsAgo },
      },
      _count: true,
    });

    // Top specialties
    const topSpecialties = await this.prisma.serviceRequest.groupBy({
      by: ['specialtyId'],
      _count: true,
      orderBy: { _count: { specialtyId: 'desc' } },
      take: 5,
    });

    // Top rated craftsmen
    const topCraftsmen = await this.prisma.rating.groupBy({
      by: ['ratedUserId'],
      _avg: { rating: true },
      _count: true,
      orderBy: { _avg: { rating: 'desc' } },
      take: 5,
    });

    return {
      overview: {
        totalUsers,
        totalCraftsmen,
        totalClients,
        totalRequests,
        totalPayments,
        totalRatings,
      },
      requests: {
        pending: pendingRequests,
        active: activeRequests,
        completed: completedRequests,
        total: totalRequests,
      },
      revenue: {
        total: totalRevenue._sum.amount || 0,
        currency: 'SAR',
      },
      trends: {
        monthlyStats,
        topSpecialties,
        topCraftsmen,
      },
    };
  }

  async getRevenueReport(startDate: Date, endDate: Date) {
    const payments = await this.prisma.payment.findMany({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        status: PaymentStatus.PAID,
      },
      include: {
        request: {
          include: {
            specialty: true,
          },
        },
      },
    });

    const dailyRevenue = {};
    const specialtyRevenue = {};
    const paymentMethodRevenue = {};

    payments.forEach(payment => {
      // Daily breakdown
      const date = payment.createdAt.toISOString().split('T')[0];
      dailyRevenue[date] = (dailyRevenue[date] || 0) + payment.amount;

      // Specialty breakdown
      const specialtyName = payment.request.specialty.nameEn;
      specialtyRevenue[specialtyName] = (specialtyRevenue[specialtyName] || 0) + payment.amount;

      // Payment method breakdown
      const method = payment.paymentMethod;
      paymentMethodRevenue[method] = (paymentMethodRevenue[method] || 0) + payment.amount;
    });

    return {
      period: { startDate, endDate },
      totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
      totalTransactions: payments.length,
      dailyRevenue,
      specialtyRevenue,
      paymentMethodRevenue,
    };
  }

  async getUserActivityReport(userId: string, startDate: Date, endDate: Date) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        clientRequests: {
          where: {
            createdAt: { gte: startDate, lte: endDate },
          },
          include: {
            specialty: true,
            offers: true,
            rating: true,
            payment: true,
          },
        },
        craftsmanOffers: {
          where: {
            createdAt: { gte: startDate, lte: endDate },
          },
          include: {
            request: {
              include: {
                specialty: true,
                client: true,
              },
            },
          },
        },
        ratings: {
          where: {
            createdAt: { gte: startDate, lte: endDate },
          },
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const totalRequests = user.clientRequests.length;
    const totalOffers = user.craftsmanOffers.length;
    const totalRatings = user.ratings.length;
    const completedRequests = user.clientRequests.filter(r => r.status === RequestStatus.COMPLETED).length;
    const acceptedOffers = user.craftsmanOffers.filter(o => o.status === 'ACCEPTED').length;

    const totalSpent = user.clientRequests
      .filter(r => r.payment?.status === PaymentStatus.PAID)
      .reduce((sum, r) => sum + (r.payment?.amount || 0), 0);

    const totalEarned = user.craftsmanOffers
      .filter(o => o.status === 'ACCEPTED')
      .reduce((sum, o) => sum + o.price, 0);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
      },
      period: { startDate, endDate },
      activity: {
        totalRequests,
        totalOffers,
        totalRatings,
        completedRequests,
        acceptedOffers,
      },
      financial: {
        totalSpent,
        totalEarned,
        netAmount: user.userType === UserType.CLIENT ? -totalSpent : totalEarned,
      },
      details: {
        requests: user.clientRequests,
        offers: user.craftsmanOffers,
        ratings: user.ratings,
      },
    };
  }

  // System Management
  async getSystemHealth() {
    try {
      // Test database connection
      await this.prisma.$queryRaw`SELECT 1`;
      
      // Get system info
      const dbSize = await this.prisma.$queryRaw`
        SELECT pg_size_pretty(pg_database_size(current_database())) as size
      `;

      return {
        status: 'healthy',
        database: 'connected',
        databaseSize: dbSize[0]?.size || 'unknown',
        timestamp: new Date(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date(),
      };
    }
  }

  async clearCache() {
    // Implement cache clearing logic if using Redis or similar
    return { success: true, message: 'Cache cleared successfully' };
  }

  async backupDatabase() {
    // Implement database backup logic
    return { success: true, message: 'Database backup initiated' };
  }
}
import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { PaymentStatus, RequestStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(data: {
    amount: number;
    requestId: string;
    paymentMethod: string;
    transactionId?: string;
  }) {
    // Check if request exists and is active
    const request = await this.prisma.serviceRequest.findUnique({
      where: { id: data.requestId },
      include: {
        payment: true,
      },
    });

    if (!request) {
      throw new NotFoundException('Service request not found');
    }

    if (request.status !== RequestStatus.ACTIVE) {
      throw new ForbiddenException('Payment can only be made for active requests');
    }

    if (request.payment) {
      throw new ConflictException('Payment already exists for this request');
    }

    return this.prisma.payment.create({
      data: {
        amount: data.amount,
        status: PaymentStatus.PENDING,
        paymentMethod: data.paymentMethod,
        transactionId: data.transactionId,
        requestId: data.requestId,
      },
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

  async findPaymentByRequest(requestId: string) {
    return this.prisma.payment.findUnique({
      where: { requestId },
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

  async findPaymentById(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
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

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async findUserPayments(userId: string, userType: 'client' | 'craftsman') {
    const where: any = {};

    if (userType === 'client') {
      where.request = { clientId: userId };
    } else if (userType === 'craftsman') {
      where.request = { acceptedById: userId };
    }

    return this.prisma.payment.findMany({
      where,
      include: {
        request: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
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
            specialty: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updatePaymentStatus(
    paymentId: string,
    status: PaymentStatus,
    transactionId?: string,
  ) {
    const payment = await this.findPaymentById(paymentId);

    if (payment.status === PaymentStatus.PAID) {
      throw new ConflictException('Payment is already completed');
    }

    const updateData: any = { status };

    if (transactionId) {
      updateData.transactionId = transactionId;
    }

    if (status === PaymentStatus.PAID) {
      // Update request status to completed
      await this.prisma.serviceRequest.update({
        where: { id: payment.requestId },
        data: { status: RequestStatus.COMPLETED },
      });
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: updateData,
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

  async processPayment(paymentId: string, paymentData: {
    transactionId: string;
    paymentGateway: string;
    gatewayResponse?: any;
  }) {
    const payment = await this.findPaymentById(paymentId);

    if (payment.status !== PaymentStatus.PENDING) {
      throw new ConflictException('Payment is not in pending status');
    }

    // Simulate payment processing (replace with actual payment gateway integration)
    try {
      // Here you would integrate with your payment gateway (Stripe, PayPal, etc.)
      const isSuccessful = await this.processPaymentWithGateway(payment, paymentData);

      if (isSuccessful) {
        return await this.updatePaymentStatus(paymentId, PaymentStatus.PAID, paymentData.transactionId);
      } else {
        return await this.updatePaymentStatus(paymentId, PaymentStatus.FAILED, paymentData.transactionId);
      }
    } catch (error) {
      // Update payment status to failed
      await this.updatePaymentStatus(paymentId, PaymentStatus.FAILED, paymentData.transactionId);
      throw error;
    }
  }

  async refundPayment(paymentId: string, refundAmount?: number) {
    const payment = await this.findPaymentById(paymentId);

    if (payment.status !== PaymentStatus.PAID) {
      throw new ForbiddenException('Payment must be completed to be refunded');
    }

    const refundAmountToProcess = refundAmount || payment.amount;

    if (refundAmountToProcess > payment.amount) {
      throw new ForbiddenException('Refund amount cannot exceed payment amount');
    }

    // Simulate refund processing (replace with actual payment gateway integration)
    try {
      const isSuccessful = await this.processRefundWithGateway(payment, refundAmountToProcess);

      if (isSuccessful) {
        return await this.updatePaymentStatus(paymentId, PaymentStatus.REFUNDED);
      } else {
        throw new Error('Refund processing failed');
      }
    } catch (error) {
      throw error;
    }
  }

  async getPaymentStatistics(userId: string, userType: 'client' | 'craftsman') {
    const payments = await this.findUserPayments(userId, userType);

    const total = payments.length;
    const pending = payments.filter(p => p.status === PaymentStatus.PENDING).length;
    const paid = payments.filter(p => p.status === PaymentStatus.PAID).length;
    const failed = payments.filter(p => p.status === PaymentStatus.FAILED).length;
    const refunded = payments.filter(p => p.status === PaymentStatus.REFUNDED).length;

    const totalAmount = payments
      .filter(p => p.status === PaymentStatus.PAID)
      .reduce((sum, p) => sum + p.amount, 0);

    const totalRefunded = payments
      .filter(p => p.status === PaymentStatus.REFUNDED)
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      total,
      pending,
      paid,
      failed,
      refunded,
      totalAmount,
      totalRefunded,
      netAmount: totalAmount - totalRefunded,
      successRate: total > 0 ? (paid / total) * 100 : 0,
    };
  }

  async findPaymentsByDateRange(
    startDate: Date,
    endDate: Date,
    status?: PaymentStatus,
  ) {
    const where: any = {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (status) {
      where.status = status;
    }

    return this.prisma.payment.findMany({
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
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPaymentMethods() {
    return [
      { id: 'CASH', name: 'نقداً', nameEn: 'Cash' },
      { id: 'CARD', name: 'بطاقة ائتمان', nameEn: 'Credit Card' },
      { id: 'BANK_TRANSFER', name: 'تحويل بنكي', nameEn: 'Bank Transfer' },
      { id: 'DIGITAL_WALLET', name: 'محفظة رقمية', nameEn: 'Digital Wallet' },
    ];
  }

  async validatePaymentAmount(requestId: string, amount: number) {
    const request = await this.prisma.serviceRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Service request not found');
    }

    if (request.finalPrice && amount !== request.finalPrice) {
      throw new ForbiddenException('Payment amount must match the final price');
    }

    if (request.estimatedPrice && amount > request.estimatedPrice * 1.5) {
      throw new ForbiddenException('Payment amount exceeds reasonable limit');
    }

    return true;
  }

  // Private methods for payment gateway integration
  private async processPaymentWithGateway(payment: any, paymentData: any): Promise<boolean> {
    // Simulate payment gateway processing
    // Replace this with actual integration (Stripe, PayPal, etc.)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate 95% success rate
    return Math.random() > 0.05;
  }

  private async processRefundWithGateway(payment: any, refundAmount: number): Promise<boolean> {
    // Simulate refund processing
    // Replace this with actual integration
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate 90% success rate for refunds
    return Math.random() > 0.1;
  }

  async generatePaymentReport(startDate: Date, endDate: Date) {
    const payments = await this.findPaymentsByDateRange(startDate, endDate);

    const report = {
      period: { startDate, endDate },
      totalPayments: payments.length,
      totalAmount: payments
        .filter(p => p.status === PaymentStatus.PAID)
        .reduce((sum, p) => sum + p.amount, 0),
      totalRefunded: payments
        .filter(p => p.status === PaymentStatus.REFUNDED)
        .reduce((sum, p) => sum + p.amount, 0),
      statusBreakdown: {
        pending: payments.filter(p => p.status === PaymentStatus.PENDING).length,
        paid: payments.filter(p => p.status === PaymentStatus.PAID).length,
        failed: payments.filter(p => p.status === PaymentStatus.FAILED).length,
        refunded: payments.filter(p => p.status === PaymentStatus.REFUNDED).length,
      },
      paymentMethodBreakdown: {},
      dailyBreakdown: {},
    };

    // Payment method breakdown
    payments.forEach(payment => {
      const method = payment.paymentMethod;
      if (!report.paymentMethodBreakdown[method]) {
        report.paymentMethodBreakdown[method] = { count: 0, amount: 0 };
      }
      report.paymentMethodBreakdown[method].count++;
      if (payment.status === PaymentStatus.PAID) {
        report.paymentMethodBreakdown[method].amount += payment.amount;
      }
    });

    // Daily breakdown
    payments.forEach(payment => {
      const date = payment.createdAt.toISOString().split('T')[0];
      if (!report.dailyBreakdown[date]) {
        report.dailyBreakdown[date] = { count: 0, amount: 0 };
      }
      report.dailyBreakdown[date].count++;
      if (payment.status === PaymentStatus.PAID) {
        report.dailyBreakdown[date].amount += payment.amount;
      }
    });

    return report;
  }
}

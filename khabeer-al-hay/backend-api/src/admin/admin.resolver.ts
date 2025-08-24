import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from '../common/guards/admin.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver('Admin')
@UseGuards(AdminGuard)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  // User Management
  @Query()
  async adminGetAllUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
    @Args('filters') filters?: any,
  ) {
    return this.adminService.getAllUsers(page, limit, filters);
  }

  @Query()
  async adminGetUserById(@Args('userId') userId: string) {
    return this.adminService.getUserById(userId);
  }

  @Mutation()
  async adminUpdateUserStatus(
    @Args('userId') userId: string,
    @Args('updates') updates: any,
  ) {
    return this.adminService.updateUserStatus(userId, updates);
  }

  @Mutation()
  async adminDeleteUser(@Args('userId') userId: string) {
    return this.adminService.deleteUser(userId);
  }

  // Service Requests Management
  @Query()
  async adminGetAllRequests(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
    @Args('filters') filters?: any,
  ) {
    return this.adminService.getAllRequests(page, limit, filters);
  }

  @Query()
  async adminGetRequestById(@Args('requestId') requestId: string) {
    return this.adminService.getRequestById(requestId);
  }

  @Mutation()
  async adminUpdateRequestStatus(
    @Args('requestId') requestId: string,
    @Args('status') status: string,
  ) {
    return this.adminService.updateRequestStatus(requestId, status);
  }

  // Payments Management
  @Query()
  async adminGetAllPayments(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
    @Args('filters') filters?: any,
  ) {
    return this.adminService.getAllPayments(page, limit, filters);
  }

  @Query()
  async adminGetPaymentById(@Args('paymentId') paymentId: string) {
    return this.adminService.getPaymentById(paymentId);
  }

  // Analytics and Statistics
  @Query()
  async adminGetDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Query()
  async adminGetRevenueReport(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.adminService.getRevenueReport(startDate, endDate);
  }

  @Query()
  async adminGetUserActivityReport(
    @Args('userId') userId: string,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.adminService.getUserActivityReport(userId, startDate, endDate);
  }

  // System Management
  @Query()
  async adminGetSystemHealth() {
    return this.adminService.getSystemHealth();
  }

  @Mutation()
  async adminClearCache() {
    return this.adminService.clearCache();
  }

  @Mutation()
  async adminBackupDatabase() {
    return this.adminService.backupDatabase();
  }
}
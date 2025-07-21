import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }

  @Query()
  async craftsmen(
    @Args('specialtyId') specialtyId: string,
    @Args('latitude', { nullable: true }) latitude?: number,
    @Args('longitude', { nullable: true }) longitude?: number,
  ) {
    return this.usersService.findCraftsmenBySpecialty(specialtyId, latitude, longitude);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async updateLocation(
    @CurrentUser() user: User,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
    @Args('address', { nullable: true }) address?: string,
  ) {
    return this.usersService.updateLocation(user.id, latitude, longitude, address);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async toggleAvailability(@CurrentUser() user: User) {
    return this.usersService.toggleAvailability(user.id);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { UserType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        specialties: {
          include: {
            specialty: true,
          },
        },
        ratings: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findCraftsmenBySpecialty(specialtyId: string, latitude?: number, longitude?: number) {
    const craftsmen = await this.prisma.user.findMany({
      where: {
        userType: UserType.CRAFTSMAN,
        isActive: true,
        isAvailable: true,
        specialties: {
          some: {
            specialtyId,
          },
        },
      },
      include: {
        specialties: {
          include: {
            specialty: true,
          },
        },
        ratings: true,
      },
    });

    // TODO: Add distance calculation based on latitude/longitude
    return craftsmen;
  }

  async updateProfile(userId: string, updateData: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async updateLocation(userId: string, latitude: number, longitude: number, address?: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        latitude,
        longitude,
        address,
      },
    });
  }

  async toggleAvailability(userId: string) {
    const user = await this.findById(userId);
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isAvailable: !user.isAvailable,
      },
    });
  }
}
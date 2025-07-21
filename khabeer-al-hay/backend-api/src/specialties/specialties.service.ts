import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class SpecialtiesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.specialty.findMany({
      where: { isActive: true },
      orderBy: { nameAr: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.specialty.findUnique({
      where: { id },
    });
  }

  async create(data: { nameAr: string; nameEn: string; description?: string; icon?: string }) {
    return this.prisma.specialty.create({
      data,
    });
  }

  async update(id: string, data: { nameAr?: string; nameEn?: string; description?: string; icon?: string }) {
    return this.prisma.specialty.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.specialty.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // Initialize default specialties
  async seedSpecialties() {
    const specialties = [
      {
        nameAr: 'كهربائي',
        nameEn: 'Electrician',
        description: 'تركيب وصيانة الأنظمة الكهربائية',
        icon: 'electrical_services',
      },
      {
        nameAr: 'سباك',
        nameEn: 'Plumber',
        description: 'إصلاح وصيانة أنظمة السباكة والمياه',
        icon: 'plumbing',
      },
      {
        nameAr: 'نجار',
        nameEn: 'Carpenter',
        description: 'أعمال النجارة والأثاث الخشبي',
        icon: 'construction',
      },
      {
        nameAr: 'فني تكييف',
        nameEn: 'AC Technician',
        description: 'صيانة وإصلاح أجهزة التكييف',
        icon: 'ac_unit',
      },
      {
        nameAr: 'دهان',
        nameEn: 'Painter',
        description: 'دهان الجدران والأسطح',
        icon: 'format_paint',
      },
      {
        nameAr: 'فني أجهزة',
        nameEn: 'Appliance Repair',
        description: 'صيانة الأجهزة المنزلية',
        icon: 'home_repair_service',
      },
    ];

    for (const specialty of specialties) {
      await this.prisma.specialty.upsert({
        where: { nameEn: specialty.nameEn },
        update: {},
        create: specialty,
      });
    }
  }
}
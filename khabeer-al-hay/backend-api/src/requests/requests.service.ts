import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement service request methods
  async findAll() {
    return this.prisma.serviceRequest.findMany();
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement offers methods
}

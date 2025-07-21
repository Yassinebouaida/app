import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement ratings methods
}

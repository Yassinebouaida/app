import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement chat methods
}

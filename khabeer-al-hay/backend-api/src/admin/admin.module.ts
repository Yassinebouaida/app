import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { PrismaModule } from '../config/prisma.module';
import { UsersModule } from '../users/users.module';
import { SpecialtiesModule } from '../specialties/specialties.module';
import { RequestsModule } from '../requests/requests.module';
import { PaymentsModule } from '../payments/payments.module';
import { RatingsModule } from '../ratings/ratings.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    SpecialtiesModule,
    RequestsModule,
    PaymentsModule,
    RatingsModule,
  ],
  providers: [AdminService, AdminResolver],
  exports: [AdminService],
})
export class AdminModule {}
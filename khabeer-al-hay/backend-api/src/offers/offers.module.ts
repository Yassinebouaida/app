import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersResolver } from './offers.resolver';

@Module({
  providers: [OffersService, OffersResolver],
  exports: [OffersService],
})
export class OffersModule {}

import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesResolver } from './specialties.resolver';

@Module({
  providers: [SpecialtiesService, SpecialtiesResolver],
  exports: [SpecialtiesService],
})
export class SpecialtiesModule {}
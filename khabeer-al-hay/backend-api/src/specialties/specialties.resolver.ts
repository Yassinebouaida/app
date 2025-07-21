import { Resolver, Query } from '@nestjs/graphql';
import { SpecialtiesService } from './specialties.service';

@Resolver('Specialty')
export class SpecialtiesResolver {
  constructor(private specialtiesService: SpecialtiesService) {}

  @Query()
  async specialties() {
    return this.specialtiesService.findAll();
  }
}
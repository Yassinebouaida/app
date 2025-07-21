import { Resolver } from '@nestjs/graphql';
import { OffersService } from './offers.service';

@Resolver()
export class OffersResolver {
  constructor(private offersService: OffersService) {}

  // TODO: Implement offers resolvers
}

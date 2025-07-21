import { Resolver } from '@nestjs/graphql';
import { RatingsService } from './ratings.service';

@Resolver()
export class RatingsResolver {
  constructor(private ratingsService: RatingsService) {}

  // TODO: Implement ratings resolvers
}

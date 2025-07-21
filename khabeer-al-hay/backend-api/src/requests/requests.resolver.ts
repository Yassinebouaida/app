import { Resolver, Query } from '@nestjs/graphql';
import { RequestsService } from './requests.service';

@Resolver('ServiceRequest')
export class RequestsResolver {
  constructor(private requestsService: RequestsService) {}

  @Query()
  async requests() {
    return this.requestsService.findAll();
  }
}
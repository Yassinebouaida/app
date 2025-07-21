import { Resolver } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private paymentsService: PaymentsService) {}

  // TODO: Implement payments resolvers
}

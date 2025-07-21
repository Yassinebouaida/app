import { Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';

@Resolver()
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  // TODO: Implement chat resolvers
}

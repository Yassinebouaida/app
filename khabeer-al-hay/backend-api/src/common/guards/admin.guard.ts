import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    
    if (!request.user) {
      throw new ForbiddenException('Authentication required');
    }

    if (request.user.userType !== UserType.ADMIN) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
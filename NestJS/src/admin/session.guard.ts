// session.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
                const request = context.switchToHttp().getRequest();
                if (request.session.email) {
                        return true;
                }
                return false;
        }
}
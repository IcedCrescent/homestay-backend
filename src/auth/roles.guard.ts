import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('User not authenticated');
    }

    const payload = await this.authService.verifyJwt(token).catch(() => {
      throw new UnauthorizedException('Invalid token');
    });

    if (roles.length && !roles.includes(payload.role)) {
      throw new ForbiddenException(
        `Invalid user role, only ${roles.join(', ')} allowed`,
      );
    }

    request.jwtPayload = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

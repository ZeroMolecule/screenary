import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { getToken } from 'next-auth/jwt';
import { IS_PUBLIC_ONLY_KEY } from '../decorators/public-only.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { EnvVariables } from '../env-variables';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService<EnvVariables, true>,
    private prismaService: PrismaService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const jwt = await getToken({
      req,
      secret: this.configService.get('NEXTAUTH_SECRET'),
    });

    const isPublicOnly = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ONLY_KEY,
      [context.getHandler(), context.getClass()]
    );
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublicOnly && jwt) {
      throw new UnauthorizedException();
    }
    if (!isPublicOnly && !isPublic && !jwt) {
      throw new UnauthorizedException();
    }
    if (!jwt) {
      return true;
    }

    const id = jwt.sub;
    if (!id) {
      throw new UnauthorizedException();
    } else {
      const user = await this.prismaService.user.findFirst({
        where: { id },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      req['user'] = user;
    }

    return true;
  }
}

import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { PrismaService } from '../shared/services/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prismaService: PrismaService) {}

  @Get('me')
  async me(@AuthUser() user: User) {
    return this.prismaService.user.findFirst({ where: { id: user.id } });
  }
}

import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { PrismaService } from '../shared/services/prisma.service';
import { MeUpdateDto, meUpdateSchema } from './dtos/me-update.dto';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private prismaService: PrismaService) {}

  @Get('me')
  async me(@AuthUser() user: User) {
    return this.prismaService.user.findFirst({ where: { id: user.id } });
  }

  @Put('me')
  async updateMe(
    @AuthUser() user: User,
    @Body(new ZodValidationPipe(meUpdateSchema)) body: MeUpdateDto
  ) {
    return this.prismaService.user.update({
      where: { id: user.id },
      data: body,
    });
  }

  @Delete('me')
  async deleteMe(@AuthUser() user: User) {
    return await this.prismaService.user.delete({
      where: { id: user.id },
    });
  }
}

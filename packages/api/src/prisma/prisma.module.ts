import { Module } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { PrismaServiceImpl } from './prisma.service';

@Module({
  exports: [PrismaService],
  providers: [
    {
      provide: PrismaService,
      useClass: PrismaServiceImpl,
    },
  ],
})
export class PrismaModule {}

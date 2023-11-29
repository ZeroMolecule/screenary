import { Module } from '@nestjs/common';
import { DirectoriesController } from './directories.controller';
import { DirectoriesService } from './directories.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
  imports: [PrismaModule],
})
export class DirectoriesModule {}

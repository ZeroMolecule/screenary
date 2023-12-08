import { Module } from '@nestjs/common';
import { EmbeddedPagesController } from './embedded-pages.controller';
import { EmbeddedPagesService } from './embedded-pages.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [EmbeddedPagesController],
  providers: [EmbeddedPagesService],
  imports: [PrismaModule],
})
export class EmbeddedPagesModule {}

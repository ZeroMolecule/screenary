import { Module } from '@nestjs/common';
import { QuickLinksController } from './quick-links.controller';
import { QuickLinksService } from './quick-links.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [QuickLinksController],
  providers: [QuickLinksService],
  imports: [PrismaModule],
})
export class QuickLinksModule {}

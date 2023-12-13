import { Module } from '@nestjs/common';
import { QuickLinksController } from './quick-links.controller';
import { QuickLinksService } from './quick-links.service';
import { PrismaModule } from '../prisma/prisma.module';
import { WebpageInfoModule } from '../webpage-info/webpage-info.module';

@Module({
  controllers: [QuickLinksController],
  providers: [QuickLinksService],
  imports: [PrismaModule, WebpageInfoModule],
})
export class QuickLinksModule {}

import { Module } from '@nestjs/common';
import { WebpageInfoServiceImpl } from './webpage-info.service';
import { WebpageInfoService } from '../shared/services/webpage-info.service';

@Module({
  exports: [WebpageInfoService],
  providers: [
    {
      provide: WebpageInfoService,
      useClass: WebpageInfoServiceImpl,
    },
  ],
})
export class WebpageInfoModule {}

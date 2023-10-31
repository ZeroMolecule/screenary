import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    throw new Error('new error thrown');
    return { message: 'Hello API' };
  }
}

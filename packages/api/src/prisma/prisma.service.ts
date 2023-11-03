import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';

@Injectable()
export class PrismaServiceImpl extends PrismaService {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('exit', app.close);
    process.on('beforeExit', app.close);
    process.on('SIGINT', app.close);
    process.on('SIGTERM', app.close);
    process.on('SIGUSR2', app.close);
  }
}

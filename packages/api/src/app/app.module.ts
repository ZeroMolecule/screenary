import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RavenModule, RavenInterceptor } from 'nest-raven';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { envVariablesSchema } from '../shared/env-variables';

@Module({
  imports: [
    RavenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        return new ZodValidationPipe(envVariablesSchema).transform(config, {
          type: 'custom',
        });
      },
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    },
  ],
})
export class AppModule {}

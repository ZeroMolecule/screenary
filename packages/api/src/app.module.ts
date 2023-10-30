import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { envVariablesSchema } from './shared/env-variables';
import { AuthGuard } from './shared/guards/auth.guard';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { ZodValidationPipe } from './shared/pipes/zod-validation.pipe';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        return new ZodValidationPipe(envVariablesSchema).transform(config, {
          type: 'custom',
        });
      },
      expandVariables: true,
    }),
    PrismaModule,
    UsersModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}

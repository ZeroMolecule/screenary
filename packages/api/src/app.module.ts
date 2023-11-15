import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { PrismaModule } from './prisma/prisma.module';
import { envVariablesSchema } from './shared/env-variables';
import { AuthGuard } from './shared/guards/auth.guard';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { ZodValidationPipe } from './shared/pipes/zod-validation.pipe';
import { UsersModule } from './users/users.module';
import { PrismaExceptionInterceptor } from './shared/interceptors/prisma-exception.interceptor';
import { NotesModule } from './notes/notes.module';
import { ProjectsModule } from './projects/projects.module';

const projectModules = [NotesModule];

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
    PrismaModule,
    UsersModule,
    NotesModule,
    ProjectsModule,
    RouterModule.register([
      {
        path: 'projects',
        module: ProjectsModule,
        children: projectModules.map((module) => ({
          path: ':projectId',
          module,
        })),
      },
    ]),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useValue: new RavenInterceptor() },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: PrismaExceptionInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}

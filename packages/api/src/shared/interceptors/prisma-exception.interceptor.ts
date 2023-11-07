import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';
import { Promise } from 'cypress/types/cy-bluebird';
import { Prisma } from '@prisma/client';

enum ErrorCodes {
  DependingRecordNotFound = 'P2025',
}
@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === ErrorCodes.DependingRecordNotFound) {
            return of(null);
          }
        }
        throw error;
      })
    );
  }
}

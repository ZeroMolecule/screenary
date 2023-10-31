import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isNil, pick } from 'lodash';
import { Observable, map } from 'rxjs';
import { IS_LIST_KEY } from '../decorators/list.decorator';
import { PaginationValidationValue } from '../pipes/pagination-validation.pipe';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<Input<T>, Output<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Output<T>> {
    const isList = this.reflector.getAllAndOverride<boolean>(IS_LIST_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return next.handle().pipe(
      map((input) => {
        if (isList) {
          const { data, pagination, meta } = input;
          return {
            data,
            meta: { pagination: this.transformPagination(pagination), ...meta },
          };
        }

        if (isNil(input)) {
          throw new NotFoundException();
        }
        return { data: input, meta: {} };
      })
    );
  }

  private transformPagination(
    pagination: Partial<PaginationValidationValue> &
      Partial<Omit<Pagination, 'total'>> &
      Pick<Pagination, 'total'>
  ): Pagination {
    const { total } = pagination;

    const take = pagination.take || total;
    const skip = pagination.skip || 0;

    const pageSize = take;
    const pageCount = Math.ceil(total / take);
    const page = Math.floor((skip + take) / take);

    return {
      page,
      pageCount,
      pageSize,
      total,
      ...pick(pagination, ['page', 'pageCount', 'pageSize']),
    };
  }
}

interface Pagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

interface Meta {
  pagination?: Pagination;
}

type Input<T> = T | { data: T[]; pagination: Pagination };

type Output<T> = { data: T; meta: Meta } | { data: T[]; meta: Meta };

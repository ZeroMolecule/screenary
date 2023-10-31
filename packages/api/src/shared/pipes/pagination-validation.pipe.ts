import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

type PaginationArg = {
  page: number;
  pageSize: number;
};

@Injectable()
export class PaginationValidationPipe
  implements PipeTransform<PaginationValidationValue>
{
  constructor(private pagination: PaginationArg = { page: 1, pageSize: 25 }) {}

  transform(value: unknown) {
    const result = schema.safeParse(
      typeof value === 'object' && value !== null && 'pagination' in value
        ? value
        : { pagination: this.pagination }
    );

    if (result.success) {
      return result.data;
    }

    const errors = ZodValidationPipe.getDErrors(result.error);

    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: errors,
    });
  }
}

export type PaginationValidationValue = z.infer<typeof schema>;

const schema = z
  .object({
    pagination: z.object({
      page: z.coerce.number().positive(),
      pageSize: z.coerce.number().positive().max(100),
    }),
  })
  .transform((value) => {
    const pagination = value.pagination;

    const pageSize = pagination.pageSize;
    const skip = pagination.page * pageSize - pageSize;

    return {
      skip,
      take: pageSize,
    };
  });

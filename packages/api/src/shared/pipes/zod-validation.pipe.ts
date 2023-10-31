import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { set } from 'lodash';
import { TypeOf, ZodError, ZodType, z } from 'zod';

@Injectable()
export class ZodValidationPipe<T extends ZodType> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown, metadata: ArgumentMetadata): TypeOf<T> {
    switch (metadata.type) {
      case 'body':
        return this.transformBody(value);
      default:
        return this.transformDefault(value);
    }
  }

  private transformDefault(value: unknown) {
    const result = this.schema.safeParse(value);

    if (result.success) {
      return result.data;
    }

    const errors = ZodValidationPipe.getDErrors(result.error);

    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: errors,
    });
  }

  private transformBody(value: unknown) {
    const schema = z.object({
      data: this.schema,
    });

    const result = schema.safeParse(value);

    if (result.success) {
      return result.data.data;
    }

    const errors = ZodValidationPipe.getDErrors(result.error);

    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: errors,
    });
  }

  static getDErrors(error: ZodError) {
    return error.issues.reduce((errors, issue) => {
      set(errors, issue.path, issue.message);
      return errors;
    }, {});
  }
}

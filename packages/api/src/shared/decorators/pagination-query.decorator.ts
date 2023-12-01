import { Query } from '@nestjs/common';
import {
  PaginationValidationPipe,
  PaginationValidationValue,
} from '../pipes/pagination-validation.pipe';

export type PaginationQuery = PaginationValidationValue;

export const PaginationQuery = Query(new PaginationValidationPipe());

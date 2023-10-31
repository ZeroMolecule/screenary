import { SetMetadata } from '@nestjs/common';

export const IS_LIST_KEY = 'isList';
export const List = () => SetMetadata(IS_LIST_KEY, true);

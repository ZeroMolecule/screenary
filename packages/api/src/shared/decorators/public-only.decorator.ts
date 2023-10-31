import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ONLY_KEY = 'isPublicOnly';
export const PublicOnly = () => SetMetadata(IS_PUBLIC_ONLY_KEY, true);

import { z } from 'zod';
import { createQuickLinkSchema } from './create-quick-link.dto';

export const updateQuickLinkSchema = createQuickLinkSchema.partial();

export type UpdateQuickLinkDto = z.infer<typeof updateQuickLinkSchema>;

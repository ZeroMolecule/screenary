import { Prisma } from '@prisma/client';

export type Project = Prisma.ProjectGetPayload<{ include: { _count: true } }>;

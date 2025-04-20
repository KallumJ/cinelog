import { z } from 'zod';
import type { SuperForm } from './types';

export const submitMediaToListSchema = z.object({
	mediaId: z.number(),
    listId: z.number()
});

export type SubmitMediaToListSchema = z.infer<typeof submitMediaToListSchema>;

export type SubmitMediaToListSuperForm = SuperForm<SubmitMediaToListSchema>;

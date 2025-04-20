import { z } from 'zod';
import type { SuperForm } from './types';

export const addMediaToListSchema = z.object({
	mediaId: z.number(),
    listId: z.number()
});

export type AddMediaToListSchema = z.infer<typeof addMediaToListSchema>;

export type AddMediaToListSuperForm = SuperForm<AddMediaToListSchema>;

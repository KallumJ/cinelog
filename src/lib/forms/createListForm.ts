import { z } from 'zod';
import type { SuperForm } from './types';

export const createListSchema = z.object({
	listName: z.string().nonempty(),
});

export type CraeteListFormSchema = z.infer<typeof createListSchema>;

export type CreateListSuperForm = SuperForm<CraeteListFormSchema>;

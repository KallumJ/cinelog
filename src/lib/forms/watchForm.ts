import { z } from 'zod';
import type { SuperForm } from './types.js';

export const watchFormSchema = z.object({
	mediaId: z.number().min(0),
});

export type WatchFormSchema = z.infer<typeof watchFormSchema>;

export type WatchSuperForm = SuperForm<WatchFormSchema>;

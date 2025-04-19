/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SuperValidated } from 'sveltekit-superforms';
import { z } from 'zod';

export const watchFormSchema = z.object({
	mediaId: z.number().min(0),
});

export type WatchFormSchema = z.infer<typeof watchFormSchema>;

export type WatchSuperForm = SuperValidated<WatchFormSchema, any, WatchFormSchema>;

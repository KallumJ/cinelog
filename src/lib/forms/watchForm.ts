/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SuperValidated } from 'sveltekit-superforms';
import { z } from 'zod';
import { MediaType } from '../tmdb/types.js';

export const watchFormSchema = z.object({
	tmdbId: z.coerce.number().min(0),
    type: z.nativeEnum(MediaType)
});

export type WatchFormSchema = z.infer<typeof watchFormSchema>;

export type WatchSuperForm = SuperValidated<WatchFormSchema, any, WatchFormSchema>;

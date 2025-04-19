/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SuperValidated } from 'sveltekit-superforms';
import { z } from 'zod';

export const ratingFormSchema = z.object({
	mediaId: z.number().min(0),
    rating: z.number().min(0.5).max(5)
});

export type RatingFormSchema = z.infer<typeof ratingFormSchema>;

export type RatingSuperForm = SuperValidated<RatingFormSchema, any, RatingFormSchema>;

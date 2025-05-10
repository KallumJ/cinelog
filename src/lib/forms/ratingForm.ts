import { z } from 'zod';
import type { SuperForm } from './types.js';

export const ratingFormSchema = z.object({
	mediaId: z.number().min(0),
    rating: z.number().min(0.5).max(5)
});

export type RatingFormSchema = z.infer<typeof ratingFormSchema>;

export type RatingSuperForm = SuperForm<RatingFormSchema>;

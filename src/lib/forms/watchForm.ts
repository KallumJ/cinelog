import { z } from "zod"

export const watchFormSchema = z.object({
    tmdbId: z.coerce.number().min(0)
})

export type WatchFormSchema = typeof watchFormSchema;
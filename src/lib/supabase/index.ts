import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { MediaType } from '../tmdb/types';
import type { Session,  } from "@supabase/supabase-js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { watchFormSchema } from '../forms/watchForm';
import { ratingFormSchema } from '../forms/ratingForm';


export async function getOrCreateMedia(
	tmdbId: number,
	type: MediaType,
	supabase: SupabaseClient<Database>
) {
	const { data: existing, error: existingError } = await supabase
		.from('media')
		.select('*')
		.match({ tmdbId })
		.maybeSingle();

	if (existingError) {
		throw existingError;
	}

	if (existing) {
		return existing;
	}

	const { data: created, error: createdError } = await supabase
		.from('media')
		.insert({ tmdbId, type })
		.select('*')
		.single();

	if (createdError) throw createdError;

	return created;
}

export async function getWatchForMediaIfToday(
	mediaId: number,
	userId: string,
	supabase: SupabaseClient<Database>
) {
	// Get current date range (start and end of the day)
	const now = new Date();
	const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
	const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

	return await supabase
		.from('watch')
		.select('*')
		.match({ userId, mediaId })
		.gte('createdAt', startOfDay)
		.lte('createdAt', endOfDay)
		.maybeSingle();
}

export async function populateControls(session: Session | null, tmdbId: number, mediaType: MediaType, supabase: SupabaseClient<Database>) {
    let mediaId: number | undefined = undefined;
	let isWatched = false;
	let rating = 0;
	
	if (session) {
		const mediaRecord = await getOrCreateMedia(tmdbId, mediaType, supabase)

		mediaId = mediaRecord.id

		const { data: recentWatch } = await getWatchForMediaIfToday(mediaId, session.user.id, supabase);
		isWatched = !!recentWatch;

		const { data: ratingRecord } = await supabase.from("rating").select("*").match({ mediaId, userId: session.user.id }).maybeSingle()
		rating = ratingRecord?.rating ?? 0
	}
	const watchForm = await superValidate({ mediaId }, zod(watchFormSchema));

	const rateForm = await superValidate({ mediaId, rating }, zod(ratingFormSchema))

    return {
        mediaId,
        watchForm,
        rateForm,
        isWatched
    }
}
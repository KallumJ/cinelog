import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { MediaType } from '../tmdb/types';

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

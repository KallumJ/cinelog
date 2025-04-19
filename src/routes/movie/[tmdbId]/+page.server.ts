import { tmdb } from '$lib/tmdb/tmdb';
import {
	convertCastToCredit,
	convertCrewToCredit,
	convertWatchLocaleToWatchProviderRegion,
	parseMediaSingle
} from '$lib/tmdb/utils';
import type { MediaPageProps } from '$lib/components/media/MediaPage.svelte';
import { partition } from '$lib/utils';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { watchFormSchema } from '$lib/forms/watchForm';
import { MediaType } from '$lib/tmdb/types';
import { getOrCreateMedia, getWatchForMediaIfToday } from '$lib/supabase';
import { ratingFormSchema } from '$lib/forms/ratingForm';

export async function load({ params: { tmdbId }, locals: { supabase, session } }): Promise<MediaPageProps> {
	const movieInformation = await tmdb.movies.details(+tmdbId);
	const credits = await tmdb.movies.credits(+tmdbId);
	const watchProviders = await tmdb.movies.watchProviders(+tmdbId);

	const PRIORITY_JOBS = ['Director'];

	const [priorityCrew, otherCrew] = partition(credits.crew, (c) => PRIORITY_JOBS.includes(c.job));

	const media = parseMediaSingle(movieInformation);

	let mediaId: number | undefined = undefined;
	let isWatched = false;
	let rating = 0;
	
	if (session) {
		const mediaRecord = await getOrCreateMedia(+tmdbId, MediaType.Movie, supabase)

		mediaId = mediaRecord.id

		const { data: recentWatch } = await getWatchForMediaIfToday(mediaId, session.user.id, supabase);
		isWatched = !!recentWatch;

		const { data: ratingRecord } = await supabase.from("rating").select("*").match({ mediaId, userId: session.user.id }).maybeSingle()
		rating = ratingRecord?.rating ?? 0
	}
	const watchForm = await superValidate({ mediaId }, zod(watchFormSchema));

	const rateForm = await superValidate({ mediaId, rating }, zod(ratingFormSchema))
	
	return {
		media,
		credits: {
			createdBy: priorityCrew.map(convertCrewToCredit),
			crew: otherCrew.map(convertCrewToCredit),
			cast: credits.cast.map(convertCastToCredit)
		},
		watchProviders: convertWatchLocaleToWatchProviderRegion(watchProviders.results),
		controls: {
			mediaId,
			watchForm,
			rateForm,
			isWatched
		},
		session
	};
}

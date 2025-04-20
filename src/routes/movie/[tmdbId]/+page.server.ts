import { tmdb } from '$lib/tmdb/tmdb';
import {
	convertCastToCredit,
	convertCrewToCredit,
	convertWatchLocaleToWatchProviderRegion,
	parseMediaSingle
} from '$lib/tmdb/utils';
import type { MediaPageProps } from '$lib/components/media/MediaPage.svelte';
import { partition } from '$lib/utils';
import { getListsForUser, populateControls } from '$lib/supabase';
import { MediaType } from '$lib/tmdb/types';

export async function load({ params: { tmdbId }, locals: { supabase, session } }): Promise<MediaPageProps> {
	const movieInformation = await tmdb.movies.details(+tmdbId);
	const credits = await tmdb.movies.credits(+tmdbId);
	const watchProviders = await tmdb.movies.watchProviders(+tmdbId);

	const PRIORITY_JOBS = ['Director'];

	const [priorityCrew, otherCrew] = partition(credits.crew, (c) => PRIORITY_JOBS.includes(c.job));

	const media = parseMediaSingle(movieInformation);

	const controls = await populateControls(session, +tmdbId, MediaType.Movie, supabase)
	
	const lists = session ? await getListsForUser(supabase, session) : []

	return {
		media,
		credits: {
			createdBy: priorityCrew.map(convertCrewToCredit),
			crew: otherCrew.map(convertCrewToCredit),
			cast: credits.cast.map(convertCastToCredit)
		},
		watchProviders: convertWatchLocaleToWatchProviderRegion(watchProviders.results),
		controls,
		session,
		lists
	};
}

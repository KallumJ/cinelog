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
import { MediaType } from '../../../lib/tmdb/types.js';

export async function load({ params: { tmdbId }, setHeaders }): Promise<MediaPageProps> {
	const movieInformation = await tmdb.movies.details(+tmdbId);
	const credits = await tmdb.movies.credits(+tmdbId);
	const watchProviders = await tmdb.movies.watchProviders(+tmdbId);

	const PRIORITY_JOBS = ['Director'];

	const [priorityCrew, otherCrew] = partition(credits.crew, (c) => PRIORITY_JOBS.includes(c.job));

	const media = parseMediaSingle(movieInformation);

	setHeaders({
		'cache-control': 'private, max-age=3600'
	});

	const watchForm = await superValidate({ tmdbId: media.tmdbId, type: MediaType.Movie }, zod(watchFormSchema));

	return {
		media,
		credits: {
			createdBy: priorityCrew.map(convertCrewToCredit),
			crew: otherCrew.map(convertCrewToCredit),
			cast: credits.cast.map(convertCastToCredit)
		},
		watchProviders: convertWatchLocaleToWatchProviderRegion(watchProviders.results),
		watchForm
	};
}

import type { MediaPageProps } from "$lib/components/media/MediaPage.svelte";
import { tmdb } from "$lib/tmdb/tmdb";
import { convertCastToCredit, convertCreatedByToCredit, convertCrewToCredit, convertWatchLocaleToWatchProviderRegion, parseMediaSingle } from "$lib/tmdb/utils";

export async function load({ params: { tmdbId }, setHeaders }): Promise<MediaPageProps> {
    const tvInformation = await tmdb.tvShows.details(+tmdbId);
    const credits = await tmdb.tvShows.credits(+tmdbId)
    const watchProviders = await tmdb.tvShows.watchProviders(+tmdbId);

    const media = parseMediaSingle(tvInformation)

    setHeaders({
		'cache-control': 'private, max-age=3600'
	});

	return {
		media,
		credits: {
			createdBy: tvInformation.created_by.map(convertCreatedByToCredit),
			crew: credits.crew.map(convertCrewToCredit),
			cast: credits.cast.map(convertCastToCredit),
		},
        watchProviders: convertWatchLocaleToWatchProviderRegion(watchProviders.results)
	};
}
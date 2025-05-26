import type { MediaPageProps } from "$lib/components/media/MediaPage.svelte";
import { tmdb } from "$lib/tmdb/tmdb";
import { convertCastToCredit, convertCreatedByToCredit, convertCrewToCredit, convertWatchLocaleToWatchProviderRegion, parseMediaSingle } from "$lib/tmdb/utils";
import { populateControls } from "$lib/supabase";
import { MediaType } from "$lib/tmdb/types";

export async function load({ params: { tmdbId }, locals: { session, supabase } }): Promise<MediaPageProps> {
    const tvInformation = await tmdb.tvShows.details(+tmdbId);
	const videos = await tmdb.tvShows.videos(+tmdbId);
	const trailer = videos.results.filter(v => v.type === "Trailer").shift();
    const credits = await tmdb.tvShows.credits(+tmdbId)
    const watchProviders = await tmdb.tvShows.watchProviders(+tmdbId);

    const media = parseMediaSingle(tvInformation)

	const controls = await populateControls(session, +tmdbId, MediaType.Tv, supabase)

	return {
		media,
		credits: {
			createdBy: tvInformation.created_by.map(convertCreatedByToCredit),
			crew: credits.crew.map(convertCrewToCredit),
			cast: credits.cast.map(convertCastToCredit),
		},
        watchProviders: convertWatchLocaleToWatchProviderRegion(watchProviders.results),
		controls,
		session,
		trailer
	};
}
import { tmdb } from '$lib/tmdb/tmdb';
import { convertBuyFlatrateRentToDetails, convertCastToCredit, convertCrewToCredit, parseMediaSingle, sortWatchProviders } from '$lib/tmdb/utils';
import type { MediaPageProps } from '$lib/components/media/MediaPage.svelte';
import { getFlagEmojiForCountryCode, partition } from '$lib/utils';
import type { Flatrate, Buy, Rent } from 'tmdb-ts';

export async function load({ params: { tmdbId }, setHeaders }): Promise<MediaPageProps> {
	const movieInformation = await tmdb.movies.details(+tmdbId);
	const credits = await tmdb.movies.credits(+tmdbId);
	const watchProviders = await tmdb.movies.watchProviders(+tmdbId);

	const PRIORITY_JOBS = ['Director'];
    const REGION_NAMES = new Intl.DisplayNames(['en'], { type: 'region' });

	const [priorityCrew, otherCrew] = partition(credits.crew, (c) => PRIORITY_JOBS.includes(c.job));

	const media = parseMediaSingle(movieInformation);

	setHeaders({
		'cache-control': 'private, max-age=3600'
	});

	return {
		media,
		credits: {
			createdBy: priorityCrew.map(convertCrewToCredit),
			crew: otherCrew.map(convertCrewToCredit),
			cast: credits.cast.map(convertCastToCredit),
		},
        watchProviders: Object.entries(watchProviders.results).map(
            ([key, provider]: [
                key: string,
                provider: {
                    link: string;
                    flatrate?: Flatrate[];
                    rent?: Rent[];
                    buy?: Buy[];
                }
            ]) => ({
                locale: key,
                link: provider.link,
                stream: provider.flatrate?.map(convertBuyFlatrateRentToDetails),
                rent: provider.rent?.map(convertBuyFlatrateRentToDetails),
                buy: provider.buy?.map(convertBuyFlatrateRentToDetails),
                countryName: REGION_NAMES.of(key) ?? "",
                countryFlag: getFlagEmojiForCountryCode(key)
            })
        ).sort(sortWatchProviders)
	};
}

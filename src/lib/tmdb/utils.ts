import {  type Buy, type Cast, type CreatedBy, type Crew, type Flatrate, type MovieDetails, type Rent, type TvShowDetails, type WatchLocale } from 'tmdb-ts';
import { MediaType, type Credit, type Media, type Provider, type WatchProviderRegion  } from './types';
import { getDateFromString, getFlagEmojiForCountryCode, getYearFromDateString, REGION_NAMES } from '$lib/utils';

export function getSrcForPath(backdrop: string, size: string) {
    if (!backdrop) 
            return null;

	return `https://image.tmdb.org/t/p/${size}${backdrop}`;
}

// Type guard to check if an object is a Movie
function isMovie(item: unknown): item is MovieDetails {
    return typeof item === 'object' && item !== null && (item as MovieDetails).title !== undefined;
}

// Type guard to check if an object is a TV show
function isTV(item: unknown): item is TvShowDetails {
    return typeof item === 'object' && item !== null && (item as TvShowDetails).name !== undefined;
}


// Helper function to convert a single Movie to Media
const convertMovie = (m: MovieDetails): Media => ({
	title: m.title,
	posterPath: m.poster_path ?? "",
	type: MediaType.Movie,
    tmdbId: m.id,
    backdropPath: m.backdrop_path,
    initalReleaseDate: getDateFromString(m.release_date),
    recentReleaseYear: getYearFromDateString(m.release_date),
    initalReleaseYear: getYearFromDateString(m.release_date),
    tagline: m.tagline,
    description: m.overview,
    aggregateRating: Math.round(m.vote_average * 10),
    otherInformation: [
        {
            key: "releaseDate",
            value: getDateFromString(m.release_date).toLocaleDateString(),
            displayText: "Release date"
        },
        {
            key: "budget",
            value: `$${(m.budget ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            displayText: "Budget (USD)"
        },
        {
            key: "runtime",
            value: `${m.runtime} minutes`,
            displayText: "Runtime"
        }
    ],
    productionCompanies: m.production_companies,
    genres: m.genres
});

// Helper function to convert a single TV show to Media
const convertTV = (t: TvShowDetails): Media => ({
	title: t.name, // Use 'name' for TV shows
	posterPath: t.poster_path,
	type: MediaType.Tv,
    tmdbId: t.id,
    backdropPath: t.backdrop_path,
    initalReleaseDate: getDateFromString(t.first_air_date),
    initalReleaseYear: getYearFromDateString(t.first_air_date),
    recentReleaseYear: getYearFromDateString(t.last_air_date),
    tagline: t.tagline,
    description: t.overview,
    aggregateRating: Math.round(t.vote_average * 10),
    otherInformation: [
        {
            key: "numOfSeasons",
            value: t.number_of_seasons?.toString(),
            displayText: "Number of seasons",
        },
        {
            key: "numOfEpisodes",
            value: t.number_of_episodes?.toString(),
            displayText: "Number of episodes"
        }
    ],
    productionCompanies: t.production_companies,
    genres: t.genres
});

export function parseMediaArray(data: unknown): Media[] {
    if (!Array.isArray(data)) {
        // Optionally warn if the input wasn't an array
        return [];
    }

    // Use reduce for a single pass: filter and map simultaneously
    return data.reduce<Media[]>((acc, item) => {
        if (isMovie(item)) {
            acc.push(convertMovie(item));
        } else if (isTV(item)) {
            acc.push(convertTV(item));
        }
        // Items that are neither Movie nor TV are implicitly skipped
        return acc;
    }, []); // Start with an empty Media array
}


export function parseMediaSingle(item: unknown): Media {
    if (isMovie(item)) {
        return convertMovie(item);
    } else if (isTV(item)) {
        return convertTV(item);
    } else {
        throw new Error('Input object is not a recognizable Movie or TV type.');
    }
}

export function convertCrewToCredit(c: Crew): Credit {
    return {
        creditId: c.credit_id,
        role: c.job,
        id: c.id,
        name: c.name,
        profilePath: c.profile_path
    }
}

export function convertCastToCredit(c: Cast): Credit {
    return {
        creditId: c.credit_id,
        role: c.character,
        id: c.id,
        name: c.name,
        profilePath: c.profile_path
    }
}

export function convertCreatedByToCredit(c: CreatedBy): Credit {
    return {
        creditId: c.credit_id,
        role: "Creator",
        id: c.id,
        name: c.name,
        profilePath: c.profile_path
    }
}

export function convertBuyFlatrateRentToDetails(p: Buy | Rent | Flatrate): Provider {
    return {
        displayPriority: p.display_priority,
        logoPath: p.logo_path,
        name: p.provider_name,
        id: p.provider_id
    }
}

export function convertWatchLocaleToWatchProviderRegion(w: WatchLocale): WatchProviderRegion[] {
    return Object.entries(w).map(
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
}

export const sortWatchProviders = (a: WatchProviderRegion, b: WatchProviderRegion): number => {
    const preferredLocales: string[] = ["GB"];

    const aIsPreferred = preferredLocales.includes(a.locale);
    const bIsPreferred = preferredLocales.includes(b.locale);

    // Case 1: 'a' is preferred, 'b' is not. 'a' comes first.
    if (aIsPreferred && !bIsPreferred) {
        return -1;
    }
    // Case 2: 'b' is preferred, 'a' is not. 'b' comes first.
    if (!aIsPreferred && bIsPreferred) {
        return 1;
    }

    // Case 3: Both are preferred OR both are not preferred.
    return a.countryName.toLowerCase().localeCompare(b.countryName.toLowerCase());
};
import type {  MovieDetails, TvShowDetails } from 'tmdb-ts';
import { MediaType, type Media } from './types';
import { getDateFromString, getYearFromDateString } from '$lib/utils';

export function getSrcForPath(backdrop: string, size: string) {
    if (backdrop === null) 
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
    initalReleaseYear: getYearFromDateString(m.release_date),
    tagline: m.tagline,
    description: m.overview,
    otherInformation: [
        {
            key: "releaseDate",
            value: getDateFromString(m.release_date).toLocaleDateString(),
            displayText: "Release date"
        },
        {
            key: "budget",
            value: `$${m.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            displayText: "Budget (USD)"
        },
        {
            key: "runtime",
            value: `${m.runtime} minutes`,
            displayText: "Runtime"
        }
    ],
    productionCompanies: m.production_companies,
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
    tagline: t.tagline,
    description: t.overview,
    otherInformation: [
        {
            key: "numOfSeasons",
            value: t.number_of_seasons.toString(),
            displayText: "Number of seasons",
        },
        {
            key: "numOfEpisodes",
            value: t.number_of_episodes.toString(),
            displayText: "Number of episodes"
        }
    ],
    productionCompanies: t.production_companies,
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


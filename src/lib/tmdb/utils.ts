import type { Movie, TV } from 'tmdb-ts';
import { MediaType, type Media } from './types';

export function getSrcForPath(backdrop: string, size: string) {
	return `https://image.tmdb.org/t/p/${size}${backdrop}`;
}

// Type guard to check if an object is a Movie
function isMovie(item: unknown): item is Movie {
    return typeof item === 'object' && item !== null && (item as Movie).title !== undefined;
}

// Type guard to check if an object is a TV show
function isTV(item: unknown): item is TV {
    return typeof item === 'object' && item !== null && (item as TV).name !== undefined;
}


// Helper function to convert a single Movie to Media
const convertMovie = (m: Movie): Media => ({
	title: m.title,
	posterPath: m.poster_path,
	type: MediaType.Movie
});

// Helper function to convert a single TV show to Media
const convertTV = (t: TV): Media => ({
	title: t.name, // Use 'name' for TV shows
	posterPath: t.poster_path,
	type: MediaType.Tv
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


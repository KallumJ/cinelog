import { tmdb } from '$lib/tmdb/tmdb'
import type { Media } from '$lib/tmdb/types';
import { parseMediaSingle } from '$lib/tmdb/utils'

export interface MoviePageProps {
    media: Media
}

export async function load({ params: { tmdbId }, setHeaders }): Promise<MoviePageProps> {
    const movieInformation = await tmdb.movies.details(+tmdbId)

    const media = parseMediaSingle(movieInformation);

    setHeaders({
        "cache-control": "private, max-age=3600"
    })

    return {
        media
    }
}
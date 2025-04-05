import { tmdb } from '$lib/tmdb/tmdb'
import { convertCastToCredit, convertCrewToCredit, parseMediaSingle } from '$lib/tmdb/utils'
import type { MediaPageProps } from '$lib/components/media/MediaPage.svelte';
import { partition } from '$lib/utils';


export async function load({ params: { tmdbId }, setHeaders }): Promise<MediaPageProps> {
    const movieInformation = await tmdb.movies.details(+tmdbId)
    const credits = await tmdb.movies.credits(+tmdbId)

    const PRIORITY_JOBS = ["Director"]

    const [priorityCrew, otherCrew] = partition(credits.crew, c => PRIORITY_JOBS.includes(c.job))

    const media = parseMediaSingle(movieInformation);

    setHeaders({
        "cache-control": "private, max-age=3600"
    })

    return {
        media,
        credits: {
            createdBy: priorityCrew.map(convertCrewToCredit),
            crew: otherCrew.map(convertCrewToCredit),
            cast: credits.cast.map(convertCastToCredit)
        }
    }
}
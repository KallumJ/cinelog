import { tmdb } from "$lib/tmdb/tmdb";
import { fail, type Actions } from "@sveltejs/kit";
import type { MoviesPlayingNow, OnTheAir } from "tmdb-ts";
import { watchFormSchema } from "$lib/forms/watchForm";

export interface HomePageProps {
    movies: MoviesPlayingNow;
    tvShows: OnTheAir;
}

export async function load({ setHeaders }): Promise<HomePageProps> {
	const movies = await tmdb.movies.nowPlaying()
    const tvShows = await tmdb.tvShows.onTheAir();

    setHeaders({
        "cache-control": "private, max-age=3600"
    })

    return {
        movies,
        tvShows
    };
}

export const actions: Actions = {
    watch: async ({ request }) => {
        const formData = await request.formData();
        const validationResult = watchFormSchema.safeParse(Object.fromEntries(formData.entries()));

        if (!validationResult.success) {
            return fail(400)
        }

        const { tmdbId } = validationResult.data

        return { success: true }
    }
};
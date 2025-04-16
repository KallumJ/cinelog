import { tmdb } from "$lib/tmdb/tmdb";
import { fail, type Actions } from "@sveltejs/kit";
import type { MoviesPlayingNow, OnTheAir } from "tmdb-ts";
import { watchFormSchema } from "$lib/forms/watchForm";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

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
        const form = await superValidate(request, zod(watchFormSchema));

        if (!form.valid) {
            return fail(400, { form })
        }

        return message(form, "Form posted successfully")
    }
};
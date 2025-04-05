import { tmdb } from "$lib/tmdb/tmdb";
import type { MoviesPlayingNow, OnTheAir } from "tmdb-ts";

export interface HomePageProps {
    movies: MoviesPlayingNow;
    tvShows: OnTheAir;
}

export async function load(): Promise<HomePageProps> {
	const movies = await tmdb.movies.nowPlaying()
    const tvShows = await tmdb.tvShows.onTheAir();

    return {
        movies,
        tvShows
    };
}
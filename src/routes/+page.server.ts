import { tmdb } from "$lib/tmdb/tmdb";
import type { PopularMovies, PopularTvShows } from "tmdb-ts";

export interface HomePageProps {
    movies: PopularMovies;
    tvShows: PopularTvShows;
}

export async function load(): Promise<HomePageProps> {
	const movies = await tmdb.movies.popular()
    const tvShows = await tmdb.tvShows.popular();

    return {
        movies,
        tvShows
    };
}
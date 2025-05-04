import { json, type RequestHandler } from "@sveltejs/kit";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { MediaType, type Media } from "$lib/tmdb/types";
import { tmdb } from "$lib/tmdb/tmdb";
import type { Movie, TV } from "tmdb-ts";
import { parseMediaArray } from "$lib/tmdb/utils";
import { getMonthFromStringOrToday } from "$lib/utils";

export const GET: RequestHandler = async ({ url }) => {
    const specifiedMonth = url.searchParams.get("month");
    const month = getMonthFromStringOrToday(specifiedMonth)

    const movies: Media[] = await getAllResults(month, MediaType.Movie)

    const tv: Media[] = await getAllResults(month, MediaType.Tv);
    
    const media = [...movies, ...tv]
    
    return json({
        media,
        month
    })
}

async function getAllResults(month: Date, mediaType: MediaType): Promise<Media[]> {
    const POPULARITY_THRESHOLD = 4;

    let allResults: unknown[] = [];
    let currentPage = 1;
    let totalPages = 0;

    const start = format(startOfMonth(month), "dd/MM/yyyy");
    const end = format(endOfMonth(month), "dd/MM/yyyy");

    do {
        const options = {
            "primary_release_date.gte": start,
            "primary_release_date.lte": end,
            "first_air_date.gte": start,
            "first_air_date.lte": end,
            include_adult: false,
            with_original_language: "en",
            page: currentPage
        };

        const result = mediaType === MediaType.Movie ? await tmdb.discover.movie(options) : await tmdb.discover.tvShow(options);

        totalPages = result.total_pages;

        allResults = [...allResults, ...result.results.filter((item: Movie | TV) => item.popularity >= POPULARITY_THRESHOLD)];

        currentPage++;
    } while (currentPage <= totalPages);

    return parseMediaArray(allResults);
}
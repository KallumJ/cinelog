import { error, json, type RequestHandler } from "@sveltejs/kit";
import { tmdb } from "$lib/tmdb/tmdb";
import { parseMediaArray } from "$lib/tmdb/utils";
import type { SearchResultsResponse } from "$lib/tmdb/types";

export const GET: RequestHandler = async ({ url }) => {
    const query = url.searchParams.get("q");
    const page = url.searchParams.get("page") ?? "1";

    if (!query) {
        return error(400, "No query provided")
    }
    
    const results = await tmdb.search.movies({ query, page: +page })

    const media = parseMediaArray(results.results)

    const response: SearchResultsResponse = {
        media,
        currentPage: +page,
        totalPages: results.total_pages,
        totalResults: results.total_results
    }
    
    return json(response)
}
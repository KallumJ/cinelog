import { TMDB } from "tmdb-ts"
import { TMDB_API_READ_TOKEN } from "$env/static/private";

export const tmdb = new TMDB(TMDB_API_READ_TOKEN ?? "")
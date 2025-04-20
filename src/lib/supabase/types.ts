import type { MediaType } from "../tmdb/types";

export interface List {
    id: number;
    name: string;
    topEntries: {
        title: string;
        posterPath: string;
        type: MediaType
        tmdbId: number;
    }[],
    allMedia: number[]
}

export enum SupabaseErrorCodes  {
    UniqueViolation = "23505"
}
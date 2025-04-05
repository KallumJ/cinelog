import type { ProductionCompany } from "tmdb-ts";

export interface Media {
    posterPath: string;
    title: string;
    type: MediaType;
    tmdbId: number;
    backdropPath: string;
    initalReleaseDate: Date;
    initalReleaseYear: number;
    tagline: string;
    description: string;
    otherInformation: { 
        key: string;
        displayText: string;
        value: string;
    }[],
    productionCompanies: ProductionCompany[],
}
export enum MediaType {
    Movie = "movie",
    Tv = "tv"
}
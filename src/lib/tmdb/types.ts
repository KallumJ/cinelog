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
    productionCompanies: ProductionCompany[]
}

export type Credits = {
    createdBy: Credit[],
    crew: Credit[],
    cast: Credit[]
}

export interface Credit {
    id: number;
    creditId: string;
    name: string;
    role: string;
    profilePath: string;
}


export enum MediaType {
    Movie = "movie",
    Tv = "tv"
}
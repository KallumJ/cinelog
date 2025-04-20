import type { Genre, ProductionCompany } from "tmdb-ts";

export interface Media {
    posterPath: string;
    title: string;
    type: MediaType;
    tmdbId: number;
    backdropPath: string;
    initalReleaseDate: Date;
    initalReleaseYear: number;
    recentReleaseYear: number;
    aggregateRating: number;
    tagline: string;
    description: string;
    otherInformation: { 
        key: string;
        displayText: string;
        value: string;
    }[],
    productionCompanies: ProductionCompany[]
    genres: Genre[]
}

export type Credits = {
    createdBy: Credit[],
    crew: Credit[],
    cast: Credit[],
}

export type WatchProviderRegion = {
    locale: string;
    link: string;
    countryName: string;
    countryFlag: string;
    stream?: Provider[];
    rent?: Provider[];
    buy?: Provider[];
}

export type Provider = {
    displayPriority: number;
    logoPath: string;
    id: number;
    name: string;
}

export interface Credit {
    id: number;
    creditId: string;
    name: string;
    role: string;
    profilePath: string;
}

export enum ProviderCategory {
    Stream = "Stream",
    Buy = "Buy",
    Rent = "Rent"
}


export enum MediaType {
    Movie = "movie",
    Tv = "tv"
}
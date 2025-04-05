
export interface Media {
    posterPath: string;
    title: string;
    type: MediaType;
    tmdbId: number;
    backdropPath: string;
    initalReleaseDate: Date;
    initalReleaseYear: number;
}
export enum MediaType {
    Movie = "movie",
    Tv = "tv"
}

export interface Media {
    posterPath: string;
    title: string;
    type: MediaType;
    tmdbId: number;
}
export enum MediaType {
    Movie = "movie",
    Tv = "tv"
}

export interface Media {
    posterPath: string;
    title: string;
    type: MediaType
}
export enum MediaType {
    Movie = "movie",
    Tv = "tv"
}
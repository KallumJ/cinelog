export interface List {
    id: number;
    name: string;
    topEntries: {
        title: string;
        poster: string;
    }[],
    allMedia: number[]
}

export enum SupabaseErrorCodes  {
    UniqueViolation = "23505"
}
export interface List {
    name: string | null;
    topEntries: {
        title: string;
        poster: string | undefined;
    }[]
}
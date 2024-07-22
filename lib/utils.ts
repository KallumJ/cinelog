export function getDateFromString(date: string) {
    return new Date(date);
}

export function getYearFromDateString(date: string) {
    return getDateFromString(date).getFullYear();
}
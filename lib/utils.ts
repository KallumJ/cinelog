export function getDateFromString(date: string) {
  return new Date(date);
}

export function getYearFromDateString(date: string) {
  return getDateFromString(date).getFullYear();
}

function padToTwoDigits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date) {
  const yyyy = date.getFullYear();
  const mm = padToTwoDigits(date.getMonth() + 1); // Months are zero-based
  const dd = padToTwoDigits(date.getDate());
  const hh = padToTwoDigits(date.getHours());
  const min = padToTwoDigits(date.getMinutes());
  const ss = padToTwoDigits(date.getSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

export const sortAlphabetically = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase())

export function getFlagEmojiForCountryCode(countryCode: string) {
  let codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}
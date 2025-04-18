import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDateFromString(date: string) {
	return new Date(date);
}

export function getYearFromDateString(date: string) {
	return getDateFromString(date).getFullYear();
}

export function partition<T>(
	arr: T[],
	predicate: (val: T, i: number, arr: T[]) => boolean
): [T[], T[]] {
	return arr.reduce<[T[], T[]]>(
		(acc, val, i, arr) => {
			// If predicate is true, add to first array, if false, add to second
			acc[predicate(val, i, arr) ? 0 : 1].push(val);
			return acc;
		},
		[[], []] // Initial accumulator value
	);
}

// Code taken from Stack Overflow, distributed under the CC license: https://stackoverflow.com/a/56505945
export function extractInitials(name: string) {
	return name
		.replace(/[^A-Za-z0-9À-ÿ ]/gi, '') // taking care of accented characters as well
		.replace(/ +/gi, ' ') // replace multiple spaces to one
		.split(/ /) // break the name into parts
		.reduce((acc, item) => acc + item[0], '') // assemble an abbreviation from the parts
		.concat(name.substring(1)) // what if the name consist only one part
		.concat(name) // what if the name is only one character
		.substring(0, 2) // get the first two characters an initials
		.toUpperCase();
}

export function getFlagEmojiForCountryCode(countryCode: string) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt(0));

	return String.fromCodePoint(...codePoints);
}

export const REGION_NAMES = new Intl.DisplayNames(['en'], { type: 'region' });

export function preload(src: string) {
	return new Promise(function(resolve) {
	  const img = new Image()
	  img.onload = resolve
	  img.src = src
	})
  }
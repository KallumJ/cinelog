import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDateFromString(date: string) {
	return new Date(date);
  }
  
  export function getYearFromDateString(date: string) {
	return getDateFromString(date).getFullYear();
  }
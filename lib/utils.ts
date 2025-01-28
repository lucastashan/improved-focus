import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function minutesToMiliseconds(minutes: number) {
  return minutes * 60 * 1000
}

export function milisecondsToMinutes(miliseconds: number) {
  return miliseconds / 60 / 1000
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

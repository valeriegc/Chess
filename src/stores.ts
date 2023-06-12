import { writable } from "svelte/store";
export interface Square {
    number: number
    coords: string;
    color: string;
    occupied: boolean;
    occupier: string;
}
export const boardArr = writable<Square[]>([]);

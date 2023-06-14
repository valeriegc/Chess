import type { SvelteComponent } from 'svelte';
import { writable } from "svelte/store";
export interface Square {
    number: number
    coords: string;
    occupier: SvelteComponent;
}
export const boardArr = writable<Square[]>([]);
export const selectedSquare = writable(0)

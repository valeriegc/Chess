import type {  SvelteComponent, SvelteComponentTyped } from 'svelte';
import { writable } from "svelte/store";
export interface Square {
    number: number;
    coords: string;
    occupier: typeof SvelteComponent | null;
}
export const boardArr = writable<Square[]>([]);
export const selectedSquare = writable(-1)

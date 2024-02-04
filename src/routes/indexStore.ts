import { writable } from 'svelte/store';

export const DEFAULT_VALUE = -1;
export const store = writable(DEFAULT_VALUE);

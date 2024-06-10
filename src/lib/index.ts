// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';
import { XML } from './xmlAPI';

const xmlp = writable<XML>(undefined);
const xmlContent = writable<string>(undefined);

const selected = writable<Node>(undefined);

export { xmlp, xmlContent, selected };

import { boardArr } from "../stores";

import BB from '../pieces/BB.svelte';
	import BW from '../pieces/BW.svelte';
	import HB from '../pieces/HB.svelte';
	import HW from '../pieces/HW.svelte';
	import KB from '../pieces/KB.svelte';
	import KW from '../pieces/KW.svelte';
	import PB from '../pieces/PB.svelte';
	import PW from '../pieces/PW.svelte';
	import QB from '../pieces/QB.svelte';
	import QW from '../pieces/QW.svelte';
	import TB from '../pieces/TB.svelte';
	import TW from '../pieces/TW.svelte';

export const initPieces = ($boardArr) => {

	const piecesBlack = [TB, HB, BB, QB, KB, BB, HB, TB];

	for (let i = 0; i < 8; i++) {
		piecesBlack.push(PB);
	}

	const piecesWhite = [TW, HW, BW, QW, KW, BW, HW, TW];
	for (let i = 0; i < 8; i++) {
		piecesWhite.unshift(PW);
	}

	for (let i = 0; i < 64; i++) {
		if (i < 16) {
			$boardArr.push({
				number: i + 1,
				coords: '',
				occupier: piecesBlack[i]
			});
		} else if (i > 47) {
			$boardArr.push({
				number: i + 1,
				coords: '',
				occupier: piecesWhite[i - 48]
			});
		} else {
			$boardArr.push({
				number: i + 1,
				coords: '',
				occupier: ''
			});
		}
		$boardArr = $boardArr;
	}}
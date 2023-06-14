<script lang="ts">
	import { boardArr } from '../stores';
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

	let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	let piecesBlack = [TB, HB, BB, QB, KB, BB, HB, TB];

	for (let i = 0; i < 8; i++) {
		piecesBlack.push(PB);
	}

	let piecesWhite = [TW, HW, BW, QW, KW, BW, HW, TW];
	for (let i = 0; i < 8; i++) {
		piecesWhite.unshift(PW);
	}

	const whiteSquares = [
		1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23, 26, 28, 30, 32, 33, 35, 37, 39, 42, 44, 46, 48, 49,
		51, 53, 55, 58, 60, 62, 64
	];

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
	}
	console.log($boardArr);
</script>

<div class="boardOuterWrap">
	<div class="boardX">
		{#each letters as letter}
			<div class="letters">{letter}</div>
		{/each}
	</div>
	<div class="boardInnerWrap">
		<div class="boardY">
			<div class="boardY">
				{#each { length: 8 } as _, i}
					<div class="numbers">{i + 1}</div>
				{/each}
			</div>
		</div>
		<div class="boardGrid">
			{#each $boardArr as square}
				<div
					class="square"
					style="background-color:{whiteSquares.includes(square.number) ? 'white' : 'darkgray'}"
				>
					<svelte:component this={square.occupier} />
				</div>
			{/each}
		</div>
		<div class="boardY">
			{#each { length: 8 } as _, i}
				<div class="numbers">{i + 1}</div>
			{/each}
		</div>
	</div>
	<div class="boardX">
		{#each letters as letter}
			<div class="letters">{letter}</div>
		{/each}
	</div>
</div>

<style>
	.boardOuterWrap {
		display: flex;
		flex-direction: column;
		height: 680px;
		width: 680px;
		margin: auto;
		color: black;
	}
	.boardX {
		display: flex;
		height: 40px;
		padding-inline: 40px;
	}
	.letters {
		width: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.boardInnerWrap {
		display: flex;
	}
	.boardY {
		height: 100%;
		width: 40px;
	}
	.numbers {
		height: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.boardGrid {
		height: 600px;
		width: 600px;
		border: solid black 1px;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);
	}
	.square {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

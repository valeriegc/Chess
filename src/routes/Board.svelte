<script lang="ts">
	import { boardArr } from '../stores';

	let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	const whiteSquares = [
		1, 3, 5, 7, 10, 12, 14, 16, 17, 19, 21, 23, 26, 28, 30, 32, 33, 35, 37, 39, 42, 44, 46, 48, 49,
		51, 53, 55, 58, 60, 62, 64
	];

	for (let i = 1; i < 65; i++) {
		$boardArr.push({
			number: i,
			coords: '',
			occupier: ''
		});
		$boardArr = $boardArr;
	}
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
				<div style="background-color:{whiteSquares.includes(square.number) ? 'white' : 'black'}" />
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
	}
</style>

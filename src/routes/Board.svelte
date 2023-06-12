<script lang="ts">
	import { boardArr } from '../stores';

	for (let i = 1; i < 65; i++) {
		if (i < 9 || (i > 16 && i < 25) || (i > 32 && i < 41) || (i > 48 && i < 57)) {
			if (i % 2 !== 0) {
				$boardArr.push({
					number: i,
					coords: '',
					color: 'white',
					occupied: false,
					occupier: ''
				});
			} else {
				$boardArr.push({
					number: i,
					coords: '',
					color: 'black',
					occupied: false,
					occupier: ''
				});
			}
		} else {
			if (i % 2 !== 0) {
				$boardArr.push({
					number: i,
					coords: '',
					color: 'black',
					occupied: false,
					occupier: ''
				});
			} else {
				$boardArr.push({
					number: i,
					coords: '',
					color: 'white',
					occupied: false,
					occupier: ''
				});
			}
			$boardArr = $boardArr;
		}
	}
</script>

<div class="boardOuterWrap">
	<div class="boardX">
		<div class="letters">A</div>
		<div class="letters">B</div>
		<div class="letters">C</div>
		<div class="letters">D</div>
		<div class="letters">E</div>
		<div class="letters">F</div>
		<div class="letters">G</div>
		<div class="letters">H</div>
	</div>
	<div class="boardInnerWrap">
		<div class="boardY">
			<div class="boardY">
				<div class="numbers">1</div>
				<div class="numbers">2</div>
				<div class="numbers">3</div>
				<div class="numbers">4</div>
				<div class="numbers">5</div>
				<div class="numbers">6</div>
				<div class="numbers">7</div>
				<div class="numbers">8</div>
			</div>
		</div>
		<div class="boardGrid">
			{#each $boardArr as square}
				<div style="background-color:{square.color};" />
			{/each}
		</div>
		<div class="boardY">
			<div class="numbers">1</div>
			<div class="numbers">2</div>
			<div class="numbers">3</div>
			<div class="numbers">4</div>
			<div class="numbers">5</div>
			<div class="numbers">6</div>
			<div class="numbers">7</div>
			<div class="numbers">8</div>
		</div>
	</div>
	<div class="boardX">
		<div class="letters">A</div>
		<div class="letters">B</div>
		<div class="letters">C</div>
		<div class="letters">D</div>
		<div class="letters">E</div>
		<div class="letters">F</div>
		<div class="letters">G</div>
		<div class="letters">H</div>
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

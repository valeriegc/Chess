<script lang="ts">
	import Board from '../../../components/Board.svelte';
	import MoveBox from '../../../components/MoveBox.svelte';
	import StartGame from '../../../components/StartGame.svelte';
	import { gameStarted } from '../../../stores';
</script>

<div class="container">
	{#if !$gameStarted}
		<StartGame />
	{/if}
	<MoveBox />
	<Board />
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		padding: 2rem;
		width: 1300px;
	}
</style>

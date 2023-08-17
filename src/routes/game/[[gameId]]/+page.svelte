<script lang="ts">
	import { page } from '$app/stores';
	import Board from '../../../components/Board.svelte';
	import MoveBox from '../../../components/MoveBox.svelte';
	import StartGame from '../../../components/StartGame.svelte';
	import { gameId, player } from '../../../stores';
	export let data;
	if ($page.params.gameId !== 'NoIdYet') {
		$gameId = $page.params.gameId;
		$player = 'white';
	}
</script>

<div class="container">
	{#if $gameId == 'NoIdYet'}
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

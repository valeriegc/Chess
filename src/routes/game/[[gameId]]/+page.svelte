<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Board from '../../../components/Board.svelte';
	import MoveBox from '../../../components/MoveBox.svelte';
	import StartGame from '../../../components/StartGame.svelte';
	import { gameId, player } from '../../../stores';
	export let data;

	onMount(() => {
		if ($page.params.gameId) {
			$gameId = $page.params.gameId;
			$player = 'white';
		} else {
			$gameId = 'NoIdYet';
			$player = 'black';
		}
	});
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

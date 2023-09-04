<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Board from '../../../components/Board.svelte';
	import MoveBox from '../../../components/MoveBox.svelte';
	import StartGame from '../../../components/StartGame.svelte';
	import { gameId, player } from '../../../stores';
	export let data;
	let visible = true;
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
	{#if !data.id.game.gameId && visible}
		<StartGame bind:visible />
	{/if}
	<MoveBox />
	<Board />
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}
</style>

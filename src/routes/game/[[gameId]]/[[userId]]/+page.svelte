<script lang="ts">
	import { page } from '$app/stores';
	import Board from '../../../../components/Board.svelte';
	import MoveBox from '../../../../components/MoveBox.svelte';
	import StartGame from '../../../../components/StartGame.svelte';
	import { gameId, player } from '../../../../stores';
	import GameSettings from '../../../../components/GameSettings.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$gameId = data.gameId;
	let visible = true;
</script>

<div class="container">
	{#if !$page.params.gameId && visible}
		<StartGame bind:visible />
	{/if}
	<MoveBox />
	<Board />
	{#if false}
		<GameSettings />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100vh;
		background-image: url('/greyBG.jpg');
	}
</style>

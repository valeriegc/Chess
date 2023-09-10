<script lang="ts">
	import Board from '../../../../components/Board.svelte';
	import MoveBox from '../../../../components/MoveBox.svelte';
	import StartGame from '../../../../components/StartGame.svelte';
	import { gameId, player, url, userId } from '../../../../stores';
	import GameSettings from '../../../../components/GameSettings.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	$gameId = data.gameId;
	$userId = data.userId;
	let visible = true;

	onMount(() => {
		const urlHasGameId = $page.params.gameId !== undefined;
		const urlHasUserId = $page.params.userId !== undefined;

		if (urlHasGameId && urlHasUserId) {
			return;
		}
		if (urlHasGameId) {
			window.location.replace($page.url + '/' + data.userId);
		}
		if (!urlHasGameId) {
			window.location.replace($page.url + '/' + data.gameId + '/' + data.userId);
		}
	});
</script>

<div class="container">
	{#if !data.gameStarted && visible}
		<StartGame bind:visible />
	{/if}
	<MoveBox />
	<Board />
	{#if data.gameStarted}
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

<script lang="ts">
	import Board from '../../../../components/Board.svelte';
	import MoveBox from '../../../../components/MoveBox.svelte';
	import StartGame from '../../../../components/StartGame.svelte';
	import { gameId, player, resign, url, userId, winner } from '../../../../stores';
	import GameSettings from '../../../../components/GameSettings.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Resigned from '../../../../components/Resigned.svelte';
	import GameEnded from '../../../../components/GameEnded.svelte';
	import Opponents from '../../../../components/Opponents.svelte';

	export let data: PageData;
	$gameId = data.gameId;
	$userId = data.userId;
	let visible = true;

	if (data.playerIsWhite) {
		$player = 'white';
	} else {
		$player = 'black';
	}

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
	<div class="leftWrap">
		<Opponents />
		<MoveBox />
	</div>
	<Board />
	{#if data.gameStarted}
		<GameSettings />
	{/if}
	{#if $resign.resigned}
		<Resigned />
	{/if}
	{#if $winner}
		<GameEnded />
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

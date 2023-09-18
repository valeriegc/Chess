<script lang="ts">
	import Board from '../../../../components/game/board/Board.svelte';
	import MoveBox from '../../../../components/game/moves/MoveBox.svelte';
	import Start from '../../../../components/game/modals/Start.svelte';
	import Settings from '../../../../components/game/settings/Settings.svelte';
	import Resigned from '../../../../components/game/modals/Resigned.svelte';
	import GameEnded from '../../../../components/game/modals/GameEnded.svelte';
	import Opponents from '../../../../components/game/players/Opponents.svelte';
	import { gameId, player, resign, url, userId, winner } from '../../../../stores';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

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
		<Start bind:visible />
	{/if}
	<div class="leftWrap">
		<Opponents />
		<MoveBox />
	</div>
	<Board />
	{#if data.gameStarted}
		<Settings />
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

<script lang="ts">
	import MoveBox from '$lib/components/game/moves/MoveBox.svelte';
	import Start from '$lib/components/game/modals/Start.svelte';
	import Settings from '$lib/components/game/settings/Settings.svelte';
	import Resigned from '$lib/components/game/modals/Resigned.svelte';
	import GameEnded from '$lib/components/game/modals/GameEnded.svelte';
	import Opponents from '$lib/components/game/players/Opponents.svelte';
	import { gameId, player, resign, url, userId, winner } from '../../../../lib/stores/stores';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Game from '$lib/components/game/Game.svelte';

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

<div class="page">
	<div class="container">
		{#if !data.gameStarted && visible}
			<Start bind:visible />
		{/if}
		<div class="leftWrap">
			<Opponents />
			<MoveBox />
		</div>
		<Game />
		<Settings />
	</div>
	{#if $resign.resigned}
		<Resigned />
	{/if}
	{#if $winner}
		<GameEnded />
	{/if}
</div>

<style>
	.page {
		background-image: url('/greyBG.jpg');
		height: 100vh;
		display: flex;
	}
	.container {
		margin: auto;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>

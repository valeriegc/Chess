<script>
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
	import Details from '../../components/Details.svelte';
	import GameDetails from '../../components/GameDetails.svelte';
	import Settings from '../../components/Settings.svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '../../stores';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log($userStore?.theme);
	});

	const signOutSSR = async () => {
		const res = await fetch('api/signin', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	};
</script>

<div class="gridWrap">
	<button on:click={signOutSSR}>SIGN OUT</button>
	<div class="grid">
		<Details />
		<GameDetails />
		<Settings />
	</div>
</div>

<style>
	* {
		margin: 0;
	}
	.gridWrap {
		display: flex;
		justify-content: center;
		padding: 3rem;
		position: relative;
		background: var(--secondary);
		/**linear-gradient(to right, var(--lightSquare), rgb(165, 141, 103));**/
	}
	.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 40rem 20rem;
		grid-template-rows: 18rem 18rem;
		height: 62rem;
	}
	button {
		position: absolute;
		right: 5rem;
		cursor: pointer;
		padding: 0.5rem;
		border: none;
		background-color: var(--primary);
		color: var(--secondary);
		font-weight: bold;
	}
</style>

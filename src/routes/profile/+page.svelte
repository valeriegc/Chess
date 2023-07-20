<script>
	import { goto } from '$app/navigation';
	import Details from '../../components/Details.svelte';
	import GameDetails from '../../components/GameDetails.svelte';
	import Settings from '../../components/Settings.svelte';
	import { auth } from '../../firebase/firebase';
	import { onAuthStateChanged, signOut } from 'firebase/auth';

	/**const redirectUser = () => {
		goto('/');
	};

	onAuthStateChanged(auth, (user) => {
		if (!user) {
			redirectUser();
			// ...
		} else {
			return;
		}
	});**/
	//personal details, settings, create a game, navbar with your profile, add friends and remove
	//friends, logout, user picture setter,
</script>

<div class="grid">
	<Details />
	<GameDetails />
	<Settings />
</div>

<style>
	.grid {
		background: linear-gradient(to right, var(--lightSquare), rgb(165, 141, 103));
		display: grid;
		gap: 3rem;
		grid-template-columns: 20rem 20rem 20rem;
		grid-template-rows: 10rem 10rem;
	}
</style>

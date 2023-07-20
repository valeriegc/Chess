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

<div class="gridWrap">
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
	}
	.grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 40rem 20rem;
		grid-template-rows: 18rem 18rem;
		height: 62rem;
	}
</style>

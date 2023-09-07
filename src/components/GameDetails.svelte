<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';

	const signOutSSR = async () => {
		const res = await fetch('api/signin', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	};
</script>

<div class="selectWrap">
	<button on:click={() => goto('/game')}>Start a game</button>
	<div>
		<p style="font-size:1.5rem;">Statistics</p>
		<div style="margin-left:1.5rem">
			<p>Games Played:</p>
			<p>Lost:</p>
			<p>Won:</p>
		</div>
		<p style="font-size:1.5rem;">Friends</p>
	</div>
	<button on:click={signOutSSR}>Sign out</button>
</div>

<style>
	.selectWrap {
		background-color: rgba(0, 0, 0, 0.562);
		padding: 2rem;
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 3;
		color: whitesmoke;
	}
	button {
		background-color: rgb(75, 79, 87);
	}
	button:hover {
		background-color: var(--secondary);
		color: var(--primary);
		transition: 2ms;
	}
	p {
		color: whitesmoke;
	}
</style>

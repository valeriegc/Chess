<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
	export let played;
	export let lost;
	export let won;

	const signOutSSR = async () => {
		const res = await fetch('api/signin', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	};
</script>

<div class="wrap">
	<div>
		<p style="font-size:1.5rem;">Game statistics</p>
		<div style="margin-left:1.5rem">
			<p>Games Played: {played}</p>
			<p>Lost: {lost}</p>
			<p>Won: {won}</p>
		</div>
	</div>
	<div class="btnWrap">
		<button on:click={signOutSSR}>Sign out</button>
		<button on:click={() => goto('/game')}>Start a game</button>
	</div>
	<div>
		<p style="font-size:1.5rem">Information on Chess</p>
		<ol>
			<li><a href="https://en.wikipedia.org/wiki/Rules_of_chess"> Rules of Chess explained</a></li>
			<li>
				<a href="https://www.youtube.com/watch?v=OCSbzArwB10">Comprehensive video for beginners</a>
			</li>
		</ol>
	</div>
</div>

<style>
	.wrap {
		background-color: rgba(0, 0, 0, 0.562);
		padding: 1.5rem;
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 3;
		color: whitesmoke;
	}
	button {
		background-color: rgb(75, 79, 87);
		padding-inline: 1rem;
	}
	button:hover {
		background-color: var(--secondary);
		color: var(--primary);
		transition: 2ms;
	}
	p {
		color: whitesmoke;
	}
	.btnWrap {
		margin: auto;
		margin-block: 3rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
	li {
		margin-bottom: 1rem;
	}
</style>

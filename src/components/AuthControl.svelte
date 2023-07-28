<script lang="ts">
	import { user } from '$lib/firebase/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<div class="outerAuthWrap">
		<div class="innerAuthWrap">
			<p>You must be signed in to enter this page</p>
			<a href="/">Sign in here</a>
		</div>
	</div>
{/if}

<style>
	.outerAuthWrap {
		display: flex;
		background: linear-gradient(to right, var(--lightSquare), rgb(165, 141, 103));
		height: 100vh;
	}
	.innerAuthWrap {
		margin: auto;
		text-align: center;
		color: var(--darkSquare);
		background-color: var(--lightSquare);
		padding: 2.5rem;
		border-radius: 30px;
	}
	p {
		font-size: 1.5rem;
	}
	a {
		text-decoration: none;
		color: var(--darkSquare);
	}
</style>

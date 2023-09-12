<script>
	import { auth } from '$lib/firebase/firebase';
	let confirmed = false;
	let email = '';
	export let open = true;
	import { sendPasswordResetEmail } from 'firebase/auth';

	const sendConfirmation = () => {
		sendPasswordResetEmail(auth, email);
		confirmed = true;
	};
</script>

<div class="container">
	<div class="wrap">
		<img src="/close.png" class="close" on:click={() => (open = false)} />
		<div class="header">
			<img class="icon" src="/pwLock.png" />
			<h3>Forgot your password?</h3>
		</div>
		<p>Email:</p>
		<input type="email" bind:value={email} />
		<button on:click={sendConfirmation}
			>Send a confirmation email
			<img class="iconS" src="/key.png" /></button
		>
		{#if confirmed}
			<p style="color:lightgreen;align-self:center">A verification email has been sent.</p>
		{/if}
	</div>
</div>

<style>
	.container {
		position: absolute;
		justify-content: center;
		height: 100%;
		width: 100%;
		background-color: var(--modalBg);
		transform: scale(1);
		z-index: 100;
		display: flex;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
	.wrap {
		margin: auto;
		width: 30rem;
		background-color: black;
		padding: 2rem;
		padding-inline: 4rem;
		border: lightgray solid 0.5px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		position: relative;
	}
	input {
		width: 100%;
	}
	p {
		margin: 0;
		align-self: flex-start;
	}
	.close {
		height: 1.5rem;
		width: 1.5rem;
		cursor: pointer;
		position: absolute;
		right: 1rem;
		top: 1rem;
	}
	h3 {
		font-weight: 400;
	}
	.icon {
		height: 1.5rem;
		width: auto;
	}
	.iconS {
		height: 1rem;
		width: auto;
	}
	p {
		font-size: small;
		margin: 0;
	}
	button {
		background-color: rgb(94, 90, 90);
		padding-inline: 1rem;
		font-size: small;
		border-radius: 5px;
		border: none;
		align-self: flex-start;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
</style>

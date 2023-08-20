<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase';
	import {
		GoogleAuthProvider,
		setPersistence,
		signInWithEmailAndPassword,
		signInWithPopup,
		browserSessionPersistence
	} from 'firebase/auth';

	let createAccount = false;
	let email = '';
	let password = '';
	let confirmationPassword = '';
	let loginError = false;
	export let form;

	const singInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);
		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});
		goto('/profile');
	};

	const regularSignIn = async () => {
		console.log('this ran');
		setPersistence(auth, browserSessionPersistence);
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await user.getIdToken();
			const res = await fetch('/api/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ idToken })
			});
			goto('/profile');
		} catch (error) {
			//TO DO: Find a correct error type
			if (error instanceof Error) {
				const errorCode = error.code;
				const errorMessage = error.message;
			}
		}
	};

	// BELOW THE OTHER SOLUTION

	// When the user signs in with email and password.
</script>

<div class="pageWrap">
	<div class="loginWrap">
		<p class="login" style="padding-bottom:1rem">Log in or create an account.</p>
		<form method="POST">
			<label>
				<p class={email ? 'filling' : 'notFilled'}>Email</p>
				<input name="email" type="email" placeholder="Email" bind:value={email} />
			</label>
			<label>
				<p class={password ? 'filling' : 'notFilled'}>Password</p>
				<input name="password" type="password" placeholder="Password" bind:value={password} />
			</label>
			{#if createAccount}
				<label>
					<p class={confirmationPassword ? 'filling' : 'notFilled'}>Confirm Password</p>
					<input name="confirmPassword" type="password" placeholder="Confirm Password" />
				</label>
			{/if}

			{#if loginError}
				<p style="color:gray">{loginError}</p>
			{/if}
			{#if form?.detailsMissing}
				<p style="color:gray">Please fill in all the fields</p>
			{/if}
			<button
				on:click={() => (createAccount ? '' : regularSignIn())}
				type={createAccount ? 'submit' : 'button'}>Submit</button
			>
		</form>
		<div class="orTextLine">
			<p class="orText">OR</p>
		</div>
		<button on:click={singInWithGoogle} class="signInBtn"
			><div style="margin-right:1rem">
				<img src="googleLogo.png" width="20" height="20" alt="logo of google" />
			</div>
			Sign {createAccount ? 'up' : 'in'} with Google</button
		>
		<div>
			<a class="choices" href="/game">Continue without registering</a>
			<p
				class="choices"
				style="padding:0.5rem"
				on:click={() => (createAccount ? (createAccount = false) : (createAccount = true))}
			>
				{createAccount ? 'Back to login' : 'Create an account'}
			</p>
			<p class="choices">Forgot your password?</p>
		</div>
	</div>
</div>

<style>
	* {
		margin: 0;
	}
	.pageWrap {
		background: white;
		min-height: 100vh;
		display: flex;
	}
	.loginWrap {
		background: transparent;
		padding: 2rem;
		padding-inline: 6rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: black;
		margin: auto;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
	}
	.login {
		font-size: 3rem;
		font-weight: bold;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem;
	}

	input:focus-within,
	input:hover {
		border: 2px black solid;
	}

	input {
		width: 18rem;
		border: darkgray 1px solid;
		height: 2.5rem;
		background-color: transparent;
		color: black;
		font-size: large;
		padding-inline: 0.5rem;
	}
	input::placeholder {
		color: darkgrey;
	}
	input:focus {
		outline: none;
	}
	button {
		width: 18rem;
		margin-bottom: 1rem;
		height: 2.75rem;
		border: none;
		background-color: black;
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 900;
		color: white;
	}
	button:hover {
		transition-duration: 0.5;
		background-color: white;
		border: black 2px solid;
		color: black;
	}
	.signInBtn {
		margin-top: 0.75rem;
		background: white;
		border: black solid 1px;
		color: black;
		display: flex;
		justify-content: center;
		padding: 0.5rem;
	}
	a {
		color: black;
		font-weight: bold;
		font-size: large;
		text-decoration: none;
	}
	.choices {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.choices:hover {
		cursor: pointer;
		color: darkgray;
	}
	.orText {
		font-size: 1.25rem;
		background-color: white;
		padding-inline: 0.75rem;
	}
	.orTextLine {
		height: 1px;
		width: 18rem;
		overflow: visible;
		background-color: black;
		display: flex;
		margin: 1.5rem;
		justify-content: center;
		align-items: center;
	}
</style>

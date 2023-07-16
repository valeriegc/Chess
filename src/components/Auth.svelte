<script lang="ts">
	import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
	let email = '';
	let password = '';
	let confirmationPassword = '';
	let loginError = '';
	let signUpError = false;
	let signUpErrorText = '';
	let createAccount = false;
	const auth = getAuth();

	const signUpValidator = () => {
		signUpError = false;
		signUpErrorText = '';
		const emailArr = [email.matchAll(/.@/g)];
		if (emailArr.length < 1) {
			signUpErrorText = 'Please provide a valid email address.';
			signUpError = true;
			return;
		}
		if (password.length < 8) {
			signUpErrorText = 'The password needs to contain minimum 8 characters';
			signUpError = true;
			return;
		}
		if (password !== confirmationPassword) {
			signUpErrorText = 'The passwords do not match';
			signUpError = true;
			return;
		}
		createUserWithEmailAndPassword(auth, email, password);
	};

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			window.location.pathname = '/game';
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
</script>

<div class="loginWrap">
	<p class="login" style="hover:color:var(--lightsquare)">{createAccount ? 'SIGN UP' : 'LOGIN'}</p>
	<form>
		<label>
			<input type="email" placeholder="email" bind:value={email} />
		</label>
		<label>
			<input type="password" placeholder="password" bind:value={password} />
		</label>
		{#if createAccount}
			<label>
				<input type="password" placeholder="confirm password" bind:value={confirmationPassword} />
			</label>
		{/if}
	</form>
	{#if loginError}
		<p style="color:pink">{loginError}</p>
	{/if}
	{#if signUpError}
		<p style="color:pink">{signUpErrorText}</p>
	{/if}
	<button on:click={() => signUpValidator()} type="submit"
		>{createAccount ? 'SIGN UP' : 'LOGIN'}</button
	>
	<div class="choices">
		<a href="/game">Continue without registering</a>
		<p on:click={() => (createAccount ? (createAccount = false) : (createAccount = true))}>
			{createAccount ? 'Back to login' : 'Create an account'}
		</p>
		<p>Forgot your password?</p>
	</div>
</div>

<style>
	* {
		margin: 0;
	}

	.loginWrap {
		background: linear-gradient(to right, var(--darkSquare), rgb(133, 94, 49));
		padding: 2rem;
		padding-inline: 2.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 30px;
		color: var(--lightSquare);
		max-width: 25rem;
		margin: auto;
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
		border: 1.5px white solid;
	}

	input {
		width: 15rem;
		border-radius: 10px;
		border: var(--lightSquare) 1px solid;
		height: 2.5rem;
		background-color: transparent;
		color: var(--lightSquare);
		font-size: large;
		padding-inline: 0.5rem;
	}
	input::placeholder {
		color: var(--lightSquare);
	}
	input:focus {
		outline: none;
	}
	button {
		width: 15rem;
		margin: 1rem;
		border-radius: 10px;
		height: 2.75rem;
		border: none;
		background-color: var(--lightSquare);
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 900;
		color: var(--darkSquare);
	}
	button:hover {
		transition-duration: 0.5;
		background-color: white;
	}
	a {
		color: white;
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
	p:hover {
		color: white;
		cursor: pointer;
	}
</style>

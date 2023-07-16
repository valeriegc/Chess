<script>
	import { goto } from '$app/navigation';
	import { auth } from '../../firebase/firebase';
	import { onAuthStateChanged, signOut } from 'firebase/auth';

	const redirectUser = () => {
		goto('/');
	};

	onAuthStateChanged(auth, (user) => {
		if (!user) {
			redirectUser();
			// ...
		} else {
			return;
		}
	});
</script>

<button on:click={() => signOut(auth)}>SIGN OUT </button>

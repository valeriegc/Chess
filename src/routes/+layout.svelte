<script>
	import { auth, db } from '../firebase/firebase';
	import './../style.css';
	import { onMount } from 'svelte';

	const allowedPages = ['/', '/game'];

	/**onMount(() => {
		const unsubsribe = auth.onAuthStateChanged(async (user) => {
			const currentPage = window.location.pathname;
			console.log(currentPage);
			const restrictedPage = allowedPages.includes(currentPage);
			const userPresent = user;
			if (!userPresent && restrictedPage) {
				window.location.href = '/';
				return;
			}
			if (userPresent && allowedPages.includes(currentPage)) {
				window.location.href = '/';
				return;
			}
		});
	});**/
</script>

<slot />

<script lang="ts">
	import { db } from '$lib/firebase/firebase';
	import { userStore } from '../stores';
	import { doc, updateDoc } from 'firebase/firestore';

	const changeTheme = async (newTheme: string) => {
		if ($userStore) {
			const docRef = doc(db, 'users', userStore.uid);
			$userStore.theme = newTheme;
			await updateDoc(docRef, {
				theme: newTheme
			});
		}
		switch (newTheme) {
			case 'bw':
				document.documentElement.style.setProperty('--primary', '0,0,0');
				document.documentElement.style.setProperty('--secondary', '255,255,255');
				break;
			case 'traditional':
				document.documentElement.style.setProperty('--primary', '159, 114, 64');
				document.documentElement.style.setProperty('--secondary', '249, 223, 175');
			case 'darkmode':
				document.documentElement.style.setProperty('--primary', '255,255,255');
				document.documentElement.style.setProperty('--secondary', '0,0,0');
		}
	};
</script>

<div class="settingWrap">
	<p style="font-size:1.75rem;margin:0">Themes</p>
	<div class="themeBox">
		<div
			class="themeIndicator"
			id="bw"
			style="border:{$userStore?.theme == 'bw' ? 'solid black 2px' : 'solid white 2px'}"
			on:click={() => changeTheme('bw')}
		>
			<p>B & W</p>
		</div>
		<div
			class="themeIndicator"
			id="traditional"
			style="border:{$userStore?.theme == 'traditional' ? 'solid black 2px' : 'solid white 2px'}"
			on:click={() => changeTheme('traditional')}
		>
			<p>Traditional</p>
		</div>
		<div
			class="themeIndicator"
			id="darkmode"
			style="border:{$userStore?.theme == 'darkmode'
				? 'solid black 2px'
				: 'solid white 2px'};color:white;"
			on:click={() => changeTheme('darkmode')}
		>
			<p>Darkmode</p>
		</div>
	</div>
</div>

<style>
	.settingWrap {
		background-color: var(--secondary);
		width: 40rem;
		padding: 2rem;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
	}
	.themeBox {
		display: flex;
		justify-content: space-around;
		margin-top: 1.5rem;
	}
	.themeIndicator {
		height: 8rem;
		width: 8rem;
		background-color: var(--secondary);
		font-size: 1.25rem;
		text-align: center;
		cursor: pointer;
	}
	#bw {
		background: linear-gradient(white, lightgray);
	}
	#traditional {
		background: linear-gradient(rgb(249, 223, 175), rgb(159, 114, 64));
	}
	#darkmode {
		background: linear-gradient(navy, black);
		color: white;
	}
</style>

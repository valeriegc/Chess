<script>
	import { theme } from '../stores';

	let bwSelect = false;
	let traditionalSelect = false;
	let darkModeSelect = false;

	$: switch ($theme) {
		case 'bw':
			bwSelect = true;
			traditionalSelect = false;
			darkModeSelect = false;
			break;
		case 'traditional':
			traditionalSelect = true;
			bwSelect = false;
			darkModeSelect = false;
			break;
		case 'darkmode':
			darkModeSelect = true;
			bwSelect = false;
			traditionalSelect = false;
	}
</script>

<div class="settingWrap">
	<p style="font-size:1.75rem;margin:0">Themes</p>
	<div class="themeBox">
		<div
			class="themeIndicator"
			id="bw"
			style="border:{bwSelect ? 'solid black 2px' : 'solid white 2px'}"
			on:click={() => ($theme = 'bw')}
		>
			<p>B & W</p>
		</div>
		<div
			class="themeIndicator"
			id="traditional"
			style="border:{traditionalSelect ? 'solid black 2px' : 'solid white 2px'}"
			on:click={() => ($theme = 'traditional')}
		>
			<p>Traditional</p>
		</div>
		<div
			class="themeIndicator"
			id="darkmode"
			style="border:{darkModeSelect ? 'solid black 2px' : 'solid white 2px'}"
			on:click={() => (($theme = 'darkmode'), ($theme = $theme))}
		>
			<p>Darkmode</p>
		</div>
	</div>
</div>

<style>
	.settingWrap {
		background-color: white;
		width: 40rem;
		color: black;
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
		background-color: white;
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

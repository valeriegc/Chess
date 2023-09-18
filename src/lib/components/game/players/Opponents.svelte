<script>
	import { db } from '$lib/firebase/firebase';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { gameId } from '../../../stores/stores';

	let player1Pic = '';
	let player1Name = 'Anonymous';
	let player2Name = 'Anonymous';
	let player2Pic = '';

	$: if ($gameId) {
		onSnapshot(doc(db, 'games', $gameId), (doc) => {
			const allData = doc.data();
			if (allData) {
				(player1Name = allData.blackName),
					(player1Pic = allData.blackPic),
					(player2Name = allData.whiteName),
					(player2Pic = allData.whitePic);
			}
		});
	}
</script>

<div class="wrap">
	<div class="playerBox">
		<div class="picBox">
			<img class="pic" src={player1Pic ? player1Pic : '/anonym.png'} />
			<div class="iconWrap" style="background-color:white">
				<img class="icon" src="/pawnIconBlack.png" />
			</div>
		</div>
		<div class="name">{player1Name ? player1Name : 'Anonymous'}</div>
	</div>
	VS.
	<div class="playerBox">
		<div class="picBox">
			<img class="pic" src={player2Pic ? player2Pic : '/anonym.png'} />
			<div class="iconWrap" style="background-color:black">
				<img class="icon" src="/pawnIconWhite.png" />
			</div>
		</div>
		<div class="name">{player2Name ? player2Name : 'Anonymous'}</div>
	</div>
</div>

<style>
	.wrap {
		height: 10rem;
		width: 350px;
		background-color: rgba(0, 0, 0, 0.411);
		margin-left: 2rem;
		margin-bottom: 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.playerBox {
		width: 50%;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	.pic {
		border: solid white 1px;
		border-radius: 100%;
		height: 6rem;
		width: 6rem;
	}
	.iconWrap {
		border-radius: 100%;
		position: absolute;
		bottom: 0.25rem;
		right: 0rem;
		height: 2rem;
		width: 2rem;
		border: solid white 1px;
		display: flex;
	}
	.icon {
		height: 1.25rem;
		width: 1.25rem;
		margin: auto;
	}
	.picBox {
		position: relative;
	}
	.name {
		font-size: small;
	}
</style>

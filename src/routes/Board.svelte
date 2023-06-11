<div class="boardOuterWrap">
	<div class="boardX">
		<div class="letters" style="width:40px" />
		<div class="letters">A</div>
		<div class="letters">B</div>
		<div class="letters">C</div>
		<div class="letters">D</div>
		<div class="letters">E</div>
		<div class="letters">F</div>
		<div class="letters">G</div>
		<div class="letters">H</div>
		<div class="letters" style="width:40px;" />
	</div>
	<div class="boardInnerWrap">
		<div class="boardY">
			<div class="boardY">
				<div class="numbers">1</div>
				<div class="numbers">2</div>
				<div class="numbers">3</div>
				<div class="numbers">4</div>
				<div class="numbers">5</div>
				<div class="numbers">6</div>
				<div class="numbers">7</div>
				<div class="numbers">8</div>
			</div>
		</div>
		<div class="actualBoard" />
		<div class="boardY">
			<div class="numbers">1</div>
			<div class="numbers">2</div>
			<div class="numbers">3</div>
			<div class="numbers">4</div>
			<div class="numbers">5</div>
			<div class="numbers">6</div>
			<div class="numbers">7</div>
			<div class="numbers">8</div>
		</div>
	</div>
	<div class="boardX">
		<div class="letters" style="width:40px" />
		<div class="letters">A</div>
		<div class="letters">B</div>
		<div class="letters">C</div>
		<div class="letters">D</div>
		<div class="letters">E</div>
		<div class="letters">F</div>
		<div class="letters">G</div>
		<div class="letters">H</div>
		<div class="letters" style="width:40px;" />
	</div>
</div>

<style>
	.boardOuterWrap {
		display: flex;
		flex-direction: column;
		height: 680px;
		width: 680px;
		margin: auto;
		color: black;
	}
	.boardX {
		display: flex;
		height: 40px;
	}
	.letters {
		width: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.boardInnerWrap {
		display: flex;
	}
	.boardY {
		height: 100%;
		width: 40px;
	}
	.numbers {
		height: 75px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.actualBoard {
		height: 600px;
		width: 600px;
		border: solid black 1px;
	}
</style>

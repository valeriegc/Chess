<div class="spinnerBox">
	<div>Awaiting for opponent</div>
	<div class="spin" />
</div>

<style>
	.spinnerBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2.5rem;
	}
	.spin {
		height: 20px;
		width: 20px;
		border-radius: 20px;
		background-color: whitesmoke;
		animation: spin 1s infinite alternate;
	}
	@keyframes spin {
		from {
			transform: translate3d(30px, 0, 0);
		}
		to {
			transform: translate3d(-30px, 0, 0);
		}
	}
</style>

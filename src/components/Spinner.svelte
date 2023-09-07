<div class="spinnerBox">
	<div>Awaiting for opponent</div>
	<div class="spin" />
</div>

<style>
	.spinnerBox {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
		font-style: italic;
		margin: 1rem;
	}
	.spin {
		height: 15px;
		width: 15px;
		border-radius: 15px;
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

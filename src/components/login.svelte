<style>
	div {
		height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	p {
		max-width: 80%;
		text-align: center;
		color: hsl(0, 0%, 50%);
	}
</style>

<div>
	<h1>Login</h1>

	<p>
		To use Dagboekje, you need to authenticate with Dropbox. Do it now!
	</p>

	<a class="button" href="/api/authenticate">
		Authenticate with Dropbox
	</a>
</div>

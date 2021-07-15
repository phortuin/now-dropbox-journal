<script>
	import Link from './link.svelte'
	let openMenu = false
</script>

<style>
	div {
		position: fixed;
		z-index: 1;
		background: hsl(196, 100%, 47%);
		width: 100vw;
		transform: translateY(0);
		transition: 150ms cubic-bezier(0, 0.5, 0, 1);
		top: 0;
	}
	div.closed {
		transform: translateY(-100%);
	}
</style>

<nav>
	<button
		on:click|preventDefault={ () => openMenu = true }>
		Menu
	</button>
</nav>

<div
	class:closed="{ !openMenu }"
	on:click|preventDefault={ () => openMenu = false }>
	<nav>
		<button>
			Close
		</button>
		<ul>
			<li>
				<Link
					href="/settings">
					Settings
				</Link>
			</li>
			<li>
				<Link
					href="/account">
					Account
				</Link>
			<li>
				<Link
					href="/">
					New entry
				</Link>
			</li>
			<li>
				<Link
					href="/editall">
					Edit all
				</Link>
			</li>
		</ul>
	</nav>
</div>

<script>
	import Link from './link.svelte'
	let openMenu = false
</script>

<style>
	nav {
		padding: 1rem;
	}
	div {
		position: fixed;
		z-index: 2;
		background: hsl(196, 100%, 47%);
		width: 100vw;
		transform: translateY(0);
		transition: 150ms cubic-bezier(0, 0.5, 0, 1);
		top: 0;
	}
	div.closed {
		transform: translateY(-100%);
	}
	.button--sticky {
		position: fixed;
		z-index: 1;
	}
</style>

<nav>
	<button
		class="button--sticky button--round"
		on:click|preventDefault={ () => openMenu = true }>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24">
			<path
				class="icon"
				d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
			<path
				d="M0 0h24v24H0z"
				fill="none"/>
		</svg>
	</button>
</nav>

<div
	class:closed="{ !openMenu }"
	on:click|preventDefault={ () => openMenu = false }>
	<nav>
		<button
			class="button--round button--inverted">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24">
				<path
					class="icon"
					d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				<path
					d="M0 0h24v24H0z"
					fill="none"/>
			</svg>
		</button>
		<ul
			class="flat-list">
			<li>
				<Link
					href="/settings"
					class="link--white">
					Settings
				</Link>
			</li>
			<li>
				<Link
					href="/"
					class="link--white">
					New entry
				</Link>
			</li>
			<li>
				<Link
					href="/editall"
					class="link--white">
					Edit all
				</Link>
			</li>
		</ul>
	</nav>
</div>

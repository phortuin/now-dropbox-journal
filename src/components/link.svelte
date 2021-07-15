<script>
	import router from './router.js'

	function handleClick(event) {
		const path = event.currentTarget.pathname
		router.redirect(path)
	}

	export let href
</script>

<a href={href} on:click|preventDefault={ handleClick }>
	<slot />
</a>

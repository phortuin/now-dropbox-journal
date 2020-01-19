<script>
	import router from './router.js'
	let props

	function handleClick(event) {
		const path = event.currentTarget.pathname
		router.redirect(path)
	}

	$: {
		props = { ...$$props }
		href = props.href
		delete props.href
	}

	export let href
</script>

<style>
	.link--white {
		color: white;
	}
</style>

<a href={href} {...props} on:click|preventDefault={ handleClick }>
	<slot />
</a>

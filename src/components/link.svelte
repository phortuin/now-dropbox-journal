<script>
	import router from './router.js'
	let props

	function handleClick(event) {
		const path = event.target.pathname
		router.redirect(path)
	}

	$: {
		props = { ...$$props }
		href = props.href
		delete props.href
	}

	export let href
</script>

<a href={href} {...props} on:click|preventDefault={ handleClick }>
	<slot />
</a>

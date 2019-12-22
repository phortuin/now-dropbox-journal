<script>
	import { activeRoute } from './stores.js'

	export let href
	let props

	function redirectTo(event) {
		$activeRoute = event.target.pathname
		window.history.pushState({ href }, '', `${window.location.origin}${href}`)
	}

	$: {
		props = { ...$$props }
		href = props.href
		delete props.href
	}
</script>

<a href={href} {...props} on:click|preventDefault={ redirectTo }>
	<slot />
</a>

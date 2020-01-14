<script>
	import { activeRoute } from './stores.js'

	export let path = ''
	export let component = null
</script>

{#if $activeRoute === path}
	{#if component}
		<svelte:component this={ component } />
	{:else}
		<slot />
	{/if}
{/if}

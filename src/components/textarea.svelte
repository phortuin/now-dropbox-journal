<script>
	import { afterUpdate } from 'svelte'


	export let content
	let textarea

	afterUpdate(() => resizeTextarea())

	function resizeTextarea() {
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea.scrollHeight}px`
	}
</script>

<style>
	textarea {
		height: 0;
		overflow-y: hidden;
	}
</style>

<textarea
	placeholder="Wat is aan hand"
	on:input={ resizeTextarea }
	bind:this={ textarea }
	bind:value={ content }></textarea>

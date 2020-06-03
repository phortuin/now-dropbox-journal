<script>
	import { onMount } from 'svelte'
	import { entry } from './stores.js'
	import router from './router.js'

	export let journal = 'Loading journal...'

	onMount(async () => {
		journal = await fetch(`/api/read`).then(response => {
			const status = response.status
			if (status !== 200) {
				if (status === 409 || status === 400) {
					alert('File location not found')
					router.redirect('/settings')
				}
				if (status === 403) {
					router.redirect('/login')
				}
			}
			return response.text()
		})
		journal = journal.replace(/\n/g, `<br>`)
	})
</script>

<style>
	article {
		padding: 1rem 1rem 2rem;
		background: #f7f7f7;
		font-size: 14px;
		min-height: 100vh;
	}
</style>

<article>
	{@html journal }
</article>

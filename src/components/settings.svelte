<script>
	import { onMount } from 'svelte'
	import { dateFormats, settings as settings_ } from '../../lib/constants'

	let settings = {}

	onMount(async () => {
		settings = await fetch('/api/settings')
			.then(response => {
				if (response.ok) {
					return response.json()
				} else {
					throw Error(response.statusText)
				}
			})
			.catch(error => {
				console.error(error)
				alert('Couldnt get settings :/')
			})
	})

	async function handleSubmit(event) {
		const form = event.target
		const method = form.method
		const action = form.action
		const response = await fetch(action, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(settings)
		})
		if (response.ok) {
			alert('ok')
		} else {
			alert('not ok')
		}
	}
</script>

<h1>Settings</h1>

<form
	method="post"
	action="/api/settings"
	on:submit|preventDefault={ handleSubmit }>
	<div>
		File location:<br>
		<input type="text" bind:value={settings[settings_.FILE_LOCATION]}>
	</div>
	<br>
	<div>
		Entry on top (prepend) or at bottom (append):<br>
		<label>
			<input type=radio bind:group={settings[settings_.PREPEND]} value="1">
			Prepend
		</label>
		<br>
		<label>
			<input type=radio bind:group={settings[settings_.PREPEND]} value="0">
			Append
		</label>
	</div>
	<br>
	<div>
		Date format:<br>
		<label>
			<input type=radio bind:group={settings[settings_.DATE_FORMAT]} value={dateFormats.DAY_MONTH}>
			Short date format (31/3)
		</label>
		<br>
		<label>
			<input type=radio bind:group={settings[settings_.DATE_FORMAT]} value={dateFormats.DAY_MONTH_YEAR}>
			Long date format (31/3/2019)
		</label>
	</div>
	<button>Update settings</button>
</form>

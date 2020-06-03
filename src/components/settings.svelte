<script>
	import { fileLocation, prepend, dateFormat } from '../components/stores.js'
	import { dateFormats } from '../../lib/constants'
	import Link from '../components/link.svelte'
	import router from '../components/router.js'
	import Cookies from 'js-cookie'

	let user = '…'

	fetch('api/me')
		.then(response => response.json())
		.then(data => {
			user = data.name.display_name
		})

	function handleSubmit() {
		// noop; users just want to store settings
		setTimeout(() => {
			alert('settings saved')
		}, 200)
	}
</script>

<h1>Settings</h1>
<p>Welkom terug { user }</p>

<form on:submit|preventDefault={ handleSubmit }>
	<div>
		File location:<br>
		<input type="text" bind:value={$fileLocation}>
	</div>
	<br>
	<div>
		Entry on top (prepend) or at bottom (append):<br>
		<label>
			<input type=radio bind:group={$prepend} value="1">
			Prepend
		</label>
		<br>
		<label>
			<input type=radio bind:group={$prepend} value="0">
			Append
		</label>
	</div>
	<br>
	<div>
		Date format:<br>
		<label>
			<input type=radio bind:group={$dateFormat} value={dateFormats.DAY_MONTH}>
			Short date format (31/3)
		</label>
		<br>
		<label>
			<input type=radio bind:group={$dateFormat} value={dateFormats.DAY_MONTH_YEAR}>
			Long date format (31/3/2019)
		</label>
	</div>
	<br>
	<button>Save settings</button>
</form>

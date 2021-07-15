<script>
	import { fileLocation, prepend, dateFormat } from '../components/stores.js'
	import { dateFormats } from '../../lib/constants'
</script>

<h1>Settings</h1>

<form>
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
	<small>Settings are stored automatically</small>
</form>

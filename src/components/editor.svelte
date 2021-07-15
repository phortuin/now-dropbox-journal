<script>
	import { onMount } from 'svelte'
	import { entry, date } from './stores.js'
	import router from './router.js'
	import Textarea from './textarea.svelte'
	import Journal from './journal.svelte'

	let journal

	onMount(() => {
		// if entry is empty on mount, reset the date
		// this is done to make sure that when opening the site, the current date
		// is used and not the date of the day you used it, when it was last
		// stored in localstorage
		// @fix
		// perhaps date should only be persistent if entry is set? hmmm
		if ($entry === '') {
			$date = new Date().toISOString().substring(0, 10)
		}
	})

	async function handleSubmit(event) {
		const form = event.target
		const method = form.method
		const action = form.action
		const response = await fetch(action,
		{
		    method,
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({ entry: $entry, date: $date })
		});
		if (response.ok) {
			$entry = ''
			$date = new Date().toISOString().substring(0, 10)
			router.redirect('/editall')
		} else {
			console.log(response)
		}
	}

	let inputElement
	let editing = false

	$: readableDate = (new Date($date)).toLocaleDateString('nl', { day: 'numeric', month: 'long', year: 'numeric' })

	function handleBlur() {
		let d = new Date(inputElement.value)
		if (d instanceof Date && !isNaN(d)) {
			$date = d.toISOString().substring(0, 10)
		} else {
			$date = new Date().toISOString().substring(0, 10)
		}
		editing = false
	}

	function handleClick() {
		editing = true
		inputElement.focus()
		inputElement.select()
	}
</script>

<style>

</style>

<form
	id="theform"
	method="post"
	action="/api/write"
	on:submit|preventDefault={ handleSubmit }>

	<label
		class:a11y-sr-only="{ editing }"
		on:click={ handleClick }>{ readableDate }</label>
	<input
		type="date"
		id="date"
		form="theform"
		name="date"
		class:a11y-sr-only="{ !editing }"
		bind:value={ $date }
		bind:this={ inputElement }
		on:blur={ handleBlur }>

	<Textarea
		bind:content={ $entry } />

	<button>
		Save
	</button>
</form>

<Journal journal={ journal }/>

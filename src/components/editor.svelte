<script>
	import { onMount } from 'svelte'
	import { entry, date } from './stores.js'
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
			let text = await response.text()
			journal = text.replace(/\n/g, '<br>')
			$entry = ''
			$date = new Date().toISOString().substring(0, 10)
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
	.line {
		height: 2px;
		background: hsl(196, 100%, 47%);
		flex: 1 0 0;
	}
	.ops {
		display: flex;
		align-items: center;
		padding: 0 1rem;
		background: linear-gradient(to bottom, transparent 0%, transparent 50%, #f7f7f7 50%)
	}
	button {
		background: transparent;
		padding: 0;
		display: flex;
		align-items: center;
		color: hsl(196, 100%, 47%);
		margin-left: .5rem;
	}
	svg {
		margin-left: 0.5rem;
		width: 2rem;
		transform: scale(1.3);
	}
	svg .arrow {
		fill: hsl(196, 100%, 47%);
	}
	input {
		background: white;
		outline: none;
		border: 0px;
		font-size: 1em;
		line-height: 1.2;
		padding-left: 1em;
		font-weight: bold;
	}

	label {
		font-size: 1em;
		line-height: 1.5;
		font-weight: bold;
		padding-left: 1em;
	}
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

	<div
		class="ops">
		<div
			class="line"></div>
		<button>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24">
				<path
					class="arrow"
					d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
				<path
					d="M0 0h24v24H0z"
					fill="none"/>
			</svg>
		</button>
	</div>
</form>

<Journal journal={ journal }/>

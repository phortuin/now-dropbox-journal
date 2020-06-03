<script>
	import { onMount } from 'svelte'
	import Textarea from './textarea.svelte'
	import router from './router.js'

	let saving = false
	let journal = 'Wait...'

	async function handleSubmit(event) {
		saving = true
		const form = event.target
		const method = form.method
		const action = form.action
		const response = await fetch(action,
		{
		    method,
		    body: journal
		});
		saving = false
		if (response.ok) {
			let text = await response.text()
			journal = text
		} else {
			alert('Something wrong :(')
			console.log(response)
		}
	}

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
				// if (json.error) {
				// 	alert(json.error)
				// }
			}
			return response.text()
		})
	})
</script>

<style>
	button {
		position: fixed;
		right: 1rem;
		top: 1rem;
		box-shadow: 0 0 0 2px hsl(196, 100%, 47%);
		background: white;
		z-index: 1;
	}
	svg .disk {
		fill: hsl(196, 100%, 47%);
	}
	button:focus {
		outline: none;
	}
	.button--saving {
		outline: none;
		box-shadow: 0 0 0 2px red;
		animation: rotate 1s linear infinite;
	}
	.button--saving svg .disk {
		fill: red;
	}
	@keyframes rotate {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}
</style>

<button
	class:button--saving="{ saving }"
	class="button--round"
	form="theform">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24">
		<path
			d="M0 0h24v24H0z"
			fill="none"/>
		<path
			class="disk"
			d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
	</svg>
</button>

<form
	id="theform"
	method="post"
	action="/api/writeall"
	on:submit|preventDefault={ handleSubmit }>

	<Textarea
		bind:content={ journal } />
</form>

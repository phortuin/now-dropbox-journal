<script>
	import router from './router.js'

	let fullname = '...'
	let avatar = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-256.png'

	function handleClick() {
		fetch('/api/logout', { method: 'post' })
			.then(response => {
				if (response.ok) {
					window.location.reload()
				} else {
					throw Error('Could not logout')
				}
			})
			.catch(alert)
	}

	fetch('api/me')
		.then(response => response.json())
		.then(data => {
			avatar = data.profile_photo_url
			fullname = data.name && data.name.display_name
		})
</script>

<h1>Account</h1>

<p>Welkom terug { fullname } </p>
<img src={ avatar } alt="">

<a href="/" on:click|preventDefault={ handleClick }>
	Logout
</a>

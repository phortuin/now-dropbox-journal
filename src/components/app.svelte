<script>
	import router from './router.js'
	import Link from './link.svelte'
	import View from './view.svelte'
	import Home from '../views/home.svelte'
	import Auth from '../views/auth.svelte'

	router.start()
</script>

<Link href="/">Home</Link>
<Link href="/auth">Auth</Link>

<View path="/" component={ Home } />
<View path="/auth" component={ Auth } />

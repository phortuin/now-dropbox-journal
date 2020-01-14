<script>
	import router from './router.js'
	import View from './view.svelte'
	import Home from '../views/home.svelte'
	import Login from '../views/login.svelte'
	import Settings from '../views/settings.svelte'

	router.start()
</script>

<View path="/" component={ Home } />
<View path="/login" component={ Login } />
<View path="/settings" component={ Settings } />

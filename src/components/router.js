import { activeRoute } from './stores.js'
import Cookies from 'js-cookie'

function start() {
	activeRoute.set(window.location.pathname)
	window.onpopstate = () => activeRoute.set(window.location.pathname)
}

function redirect(path) {
	activeRoute.set(path)
	window.history.pushState({ path }, '', path)
}

const router = {
	start,
	redirect,
}

activeRoute.subscribe(path => {
	if (path !== '/login' && !Cookies.get('session_id')) {
		redirect('/login')
	}
})

export default router

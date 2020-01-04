import { activeRoute } from './stores.js'

const router = {
	start() {
		activeRoute.set(window.location.pathname)
		window.onpopstate = () => activeRoute.set(window.location.pathname)
	},
	redirect(path) {
		activeRoute.set(path)
		window.history.pushState({ path }, '', path)
	}
}

export default router

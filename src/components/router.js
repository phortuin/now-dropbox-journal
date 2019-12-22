import { activeRoute } from './stores.js'

function setRouteStore(path) {
	activeRoute.set(path)
}

const router = {
	start() {
		setRouteStore(window.location.pathname)
		window.onpopstate = () => setRouteStore(window.location.pathname)
	}
}

export default router

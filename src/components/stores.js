import { writable } from 'svelte/store'
import { cookies, storageTypes } from '../../lib/constants'
import Cookies from 'js-cookie'

const stores = {
	[storageTypes.COOKIE]: {
		getItem(key) {
			return Cookies.get(key)
		},
		setItem(key, value) {
			Cookies.set(key, value, { expires: 365, path: '/' })
		}
	},
	[storageTypes.LOCAL_STORAGE]: {
		getItem(key) {
			return localStorage.getItem(key)
		},
		setItem(key, value) {
			localStorage.setItem(key, value)
		}
	}
}

function createPersistentWritable(type, key, defaultValue = null) {
	const { getItem, setItem } = stores[type]
	const initialValue = getItem(key) || defaultValue
	const { set, subscribe } = writable(initialValue)

	return {
		set: value => {
			setItem(key, value)
			return set(value)
		},
		subscribe,
	}
}

export const activeRoute = writable('/')
export const fileLocation = createPersistentWritable(storageTypes.COOKIE, cookies.FILE_LOCATION)
export const prepend = createPersistentWritable(storageTypes.COOKIE, cookies.PREPEND, '1')

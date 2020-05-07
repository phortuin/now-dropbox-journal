import { writable } from 'svelte/store'
import { cookies, localStorageItems, storageTypes, dateFormats } from '../../lib/constants'
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
export const entry = createPersistentWritable(storageTypes.LOCAL_STORAGE, localStorageItems.ENTRY, '')
export const date = createPersistentWritable(storageTypes.LOCAL_STORAGE, localStorageItems.DATE, new Date().toISOString().substring(0, 10))
export const fileLocation = createPersistentWritable(storageTypes.COOKIE, cookies.FILE_LOCATION)
export const prepend = createPersistentWritable(storageTypes.COOKIE, cookies.PREPEND, '1')
export const dateFormat = createPersistentWritable(storageTypes.COOKIE, cookies.DATE_FORMAT, dateFormats.DAY_MONTH)

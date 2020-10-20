import { writable } from 'svelte/store'
import { cookies, localStorageItems, storageTypes, dateFormats } from '../../lib/constants'
import Cookies from 'js-cookie'

/**
 * Contains abstractions for getting and setting key-value pairs
 * in built-in browser persistency mechanisms
 *
 * @type {Object}
 *   getItem(String key) : Object | String
 *   setItem(String key, String value) : void
 */
const stores = {
	[storageTypes.COOKIE]: {
		getItem(key) {
			let item = Cookies.get(key)
			return safeJsonParse(item)
		},
		setItem(key, value) {
			Cookies.set(key, JSON.stringify(value), { expires: 365, path: '/' })
		}
	},
	[storageTypes.LOCAL_STORAGE]: {
		getItem(key) {
			let item = localStorage.getItem(key)
			return safeJsonParse(item)
		},
		setItem(key, value) {
			localStorage.setItem(key, JSON.stringify(value))
		}
	}
}

/**
 * Failsafe way to parse JSON strings. If an error is thrown, returns
 * the passed string itself
 *
 * @param {string} string - A possible JSON string
 * @return {(Object|string)}
 */
function safeJsonParse(string) {
	try {
		return JSON.parse(string)
	} catch(error) {
		return string
	}
}

/**
 * Allow a key-value pair to be stored in (and retrieved from) the browser’s built-in
 * persistency mechanisms (cookie, localstorage). This is an enhancement of Svelte’s
 * writable store (https://svelte.dev/docs#writable)
 *
 * @param  {string} type - Represents a type of storage, as defined in the `stores` variable
 * @param  {string} key - A storage entry’s unique identifier (ex: access_token)
 * @param  {any} defaultValue - An optional default value for the entry
 * @return {Object} An object conforming to the Svelte "writable" signature
 */
function createPersistentWritable(type, key, defaultValue = null) {
	const { getItem, setItem } = stores[type]

	// Calling `writable` with the initialValue will initialize this writable store
	// with data from our persistency layer (or the default value). The `subscribe`
	// method closes over this value and will publish it to any listener.
	const initialValue = getItem(key) || defaultValue
	const { set, subscribe } = writable(initialValue)

	return {
		set: value => {
			// Store the value in a persistency layer before calling Svelte’s
			// `set` function to store the new value in memory and publish it
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

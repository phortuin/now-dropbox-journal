function oneYearFromNow() {
	let date = new Date()
	date.setFullYear(date.getFullYear() + 1)
	return date
}

function epoch() {
	return new Date(0)
}

function meta(date) {
	return `HttpOnly; SameSite=Lax; path=/; expires=${date.toUTCString()}`
}

module.exports = {
	clear: key => `${key}=deleted; ${meta(epoch())}`,
	set: (key, value) => `${key}=${value}; ${meta(oneYearFromNow())}`,
}

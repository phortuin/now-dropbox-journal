function isValidDate(date) {
	return date instanceof Date && !isNaN(date)
}

function isInvalidDate(date) {
	return !isValidDate(date)
}

module.exports = { isValidDate, isInvalidDate }

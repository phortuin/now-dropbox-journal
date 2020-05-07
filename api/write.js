const middleware = require('../lib/middleware')
const dropbox = require('../lib/dropbox-instance')
const { isInvalidDate } = require('../lib/date-validator')
const { cookies, errors, dateFormats } = require('../lib/constants')

function getDateString(date, dateFormat) {
	if (isInvalidDate(date)) {
		date = new Date()
	}
	const dateMap = {
		'd': date.getDate(),
		'm': date.getMonth() + 1,
		'y': date.getFullYear(),
	}
	return [...dateFormat].map(letter => dateMap[letter]).join('/')
}

function addEntryToJournal(prepend, dateFormat, { journal, entry, date }) {
	const dateString = getDateString(new Date(date), dateFormat)
	return prepend ?
		`${dateString}\n\n${entry}\n\n${journal}` :
		`${journal}\n\n${dateString}\n\n${entry}`
}

module.exports = middleware.authenticate(async (request, response) => {
	const path = request.cookies[cookies.FILE_LOCATION]
	const prepend = request.cookies[cookies.PREPEND]
		? !!request.cookies[cookies.PREPEND]
		: true
	const dateFormat = request.cookies[cookies.DATE_FORMAT]
		|| dateFormats.DAY_MONTH

	if (!path) {
		response.status(400)
		response.json({ error: errors.UNKNOWN_PATH })
	} else {
		try {
			const contents = addEntryToJournal(prepend, dateFormat, {
				journal: await dropbox.contents(path),
				...request.body
			})
			await dropbox.save(contents, path)
			response.end(contents)
		} catch (error) {
			// Dropbox error messages are unreliable; the filesDownload method seems to
			// return a string on the error property. Node errors can be cast toString()
			response.status(error.status || 500)
			response.json({ error: error.error || error.toString() || errors.UNKNOWN })
		}
	}
})

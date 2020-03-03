const middleware = require('../lib/middleware')
const dropbox = require('../lib/dropbox-instance')
const { isInvalidDate } = require('../lib/date-validator')
const { cookies, errors } = require('../lib/constants')

function getDateString(date) {
	if (isInvalidDate(date)) {
		date = new Date()
	}
	return `${date.getDate()}/${date.getMonth()+1}`
}

function addEntryToJournal(prepend, { journal, entry, date }) {
	const dateString = getDateString(new Date(date))
	return prepend ?
		`${dateString}\n\n${entry}\n\n${journal}` :
		`${journal}\n\n${dateString}\n\n${entry}`
}

module.exports = middleware.authenticate(async (request, response) => {
	const path = request.cookies[cookies.FILE_LOCATION]
	const prepend = request.cookies[cookies.PREPEND]
		? !!request.cookies[cookies.PREPEND]
		: true

	if (!path) {
		response.status(400)
		response.json({ error: errors.UNKNOWN_PATH })
	} else {
		try {
			const contents = addEntryToJournal(prepend, {
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

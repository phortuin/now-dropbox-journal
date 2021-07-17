const { authenticate, handleErrors, handleByMethod } = require('../lib/middleware')
const { cookies, errors, settings } = require('../lib/constants')
const { getUserSession } = require('../lib/session')
const dropbox = require('../lib/dropbox-instance')
const { isInvalidDate } = require('../lib/date-validator')

module.exports = handleErrors(authenticate(handleByMethod({ get, put, post })))

/**
 * Gets the text content from the dropbox file that the user configured.
 * Responds to the client with the text as-is, or a Bad Request if the file
 * location was not configured.
 *
 * @param  {HTTP Request object} req
 * @param  {HTTP Response object} res
 */
async function get(req, res) {
	if (!req.session.fileLocation) {
		sendMissingFileLocation(res)
	} else {
		res.end(await dropbox.contents(req.session.fileLocation))
	}
}

/**
 * Append/prepends a journal entry and date to the existing text and saves it
 * to Dropbox. Same response and error handling as get method.
 *
 * @param  {HTTP Request object} req
 * @param  {HTTP Response object} res
 */
async function post(req, res) {
	let { fileLocation, prepend, dateFormat } = req.session

	prepend || (prepend = true)
	dateFormat || (dateFormat = dateFormats.DAY_MONTH)

	if (!fileLocation) {
		sendMissingFileLocation(res)
	} else {
		// refactor naar functie
		const contents = addEntryToJournal(prepend, dateFormat, {
			journal: await dropbox.contents(fileLocation),
			...req.body
		})
		await dropbox.save(contents, fileLocation)
		res.end(contents)
	}
}

/**
 * Overwrites the complete text content in the Dropbox file that the user
 * configured and saves it to Dropbox. Same response and error handling as
 * get method.
 *
 * @param  {HTTP Request object} req
 * @param  {HTTP Response object} res
 */
async function put(req, res) {
	if (!req.session.fileLocation) {
		sendMissingFileLocation(res)
	} else {
		const contents = req.body
		await dropbox.save(contents, req.session.fileLocation)
		res.end(contents)
	}
}

/**
 * Send Bad Request response when file location is missing, because file can
 * neither be read nor written
 *
 * @param  {HTTP Response Object} res
 */
function sendMissingFileLocation(res) {
	res.status(400)
	res.json({ error: errors.UNKNOWN_PATH })
}

/**
 * Builds the date string that is used in the journal text file, based on user
 * preference and the current date. The date string uses a simple character
 * map to know which part of the date to put where, and parts are separated
 * with a forward slash. Ex:
 *
 * dm => (day, month) => 31/8
 *
 * @param  {Date object} date
 * @param  {String} dateFormat
 * @return {String}
 */
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

/**
 * Convenience method to add a new entry to the journal text file. Writes the
 * right date format and either prepends or appends the text to the existing
 * text.
 *
 * @param {Boolean} prepend
 * @param {String} dateFormat
 * @param {String} options.journal
 * @param {String} options.entry
 * @param {Date object} options.date
 */
function addEntryToJournal(prepend, dateFormat, { journal, entry, date }) {
	const dateString = getDateString(new Date(date), dateFormat)
	return prepend ?
		`${dateString}\n\n${entry}\n\n${journal}` :
		`${journal}\n\n${dateString}\n\n${entry}`
}

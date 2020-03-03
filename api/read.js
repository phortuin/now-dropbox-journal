const middleware = require('../lib/middleware')
const dropbox = require('../lib/dropbox-instance')
const { cookies, errors } = require('../lib/constants')

module.exports = middleware.authenticate(async (request, response) => {
	const path = request.cookies[cookies.FILE_LOCATION]
	if (!path) {
		response.status(400)
		response.json({ error: errors.UNKNOWN_PATH })
	} else {
		try {
			response.end(await dropbox.contents(path))
		} catch (error) {
			// Dropbox error messages are unreliable; the filesDownload method seems to
			// return a string on the error property. Node errors can be cast toString()
			response.status(error.status || 500)
			response.json({ error: error.error || error.toString() || errors.UNKNOWN })
		}
	}
})

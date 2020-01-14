const dropbox = require('../lib/dropbox-instance')
const { cookies, errors } = require('../lib/constants')

module.exports = async (request, response) => {
	const token = request.cookies[cookies.TOKEN]
	if (token) {
		dropbox.setAccessToken(token)
		const path = request.cookies[cookies.FILE_LOCATION]
		if (!path) {
			response.status(400)
			response.json({ error: errors.UNKNOWN_PATH })
		} else {
			try {
				let file = await dropbox.filesDownload({ path })
				let content = file.fileBinary.toString('utf-8')
				response.end(content)
			} catch (error) {
				// Dropbox error messages are unreliable; the filesDownload method seems to
				// return a string on the error property. Node errors can be cast toString()
				response.status(error.status || 500)
				response.json({ error: error.error || error.toString() || errors.UNKNOWN })
			}
		}
	} else {
		response.status(403)
		response.json({ error: errors.NOT_AUTHENTICATED })
	}
}

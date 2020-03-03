const dropbox = require('../lib/dropbox-instance')
const { cookies, errors } = require('../lib/constants')

module.exports = async (request, response) => {
	const token = request.cookies[cookies.TOKEN]
	if (token) {
		dropbox.setToken(token)
		try {
			response.json(await dropbox.user())
		} catch (error) {
			response.status(error.status || 500)
			response.json({ error: error.error.error_description || error.error || errors.UNKNOWN })
		}
	} else {
		response.status(403)
		response.json({ error: errors.NOT_AUTHENTICATED })
	}
}

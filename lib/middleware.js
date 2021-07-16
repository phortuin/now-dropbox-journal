const dropbox = require('./dropbox-instance')
const { cookies, errors } = require('./constants')
const { getUserSession } = require('../lib/redis-instance')

function authenticate(handler) {
	return async (request, response) => {
		const sessionId = request.cookies[cookies.SESSION_ID]
		if (sessionId) {
			const { token } = await getUserSession(sessionId)
			dropbox.setToken(token)
			return handler(request, response)
		} else {
			response.status(403)
			response.json({ error: errors.NOT_AUTHENTICATED })
		}
	}
}

module.exports = { authenticate }

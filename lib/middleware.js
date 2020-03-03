const dropbox = require('./dropbox-instance')
const { cookies, errors } = require('./constants')

function authenticate(handler) {
	return (request, response) => {
		const token = request.cookies[cookies.TOKEN]
		if (token) {
			dropbox.setToken(token)
			return handler(request, response)
		} else {
			response.status(403)
			response.json({ error: errors.NOT_AUTHENTICATED })
		}
	}
}

module.exports = { authenticate }

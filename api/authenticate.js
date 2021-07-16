const cookie = require('../lib/cookie')
const dropbox = require('../lib/dropbox-instance')
const errorPage = require('../lib/error-page')
const redirectUrl = require('../lib/redirect-url')
const randomString = require('../lib/random-string')
const { cookies, redirects, errors } = require('../lib/constants')

module.exports = (request, response) => {
	const sessionId = request.cookies[cookies.SESSION_ID]
	if (sessionId) {
		response.writeHead(302, {
			Location: redirects.DEFAULT,
			'Set-Cookie': cookie.clear(cookies.STATE)
		})
		response.end()
	} else {
		try {
			const state = randomString()
			const authUrl = dropbox.authUrl(redirectUrl(request), state)
			response.writeHead(302, {
				Location: authUrl,
				'Set-Cookie': cookie.set(cookies.STATE, state)
			})
			response.end()
		} catch (error) {
			response.writeHead(error.status || 500, {
				'Set-Cookie': cookie.clear(cookies.SESSION_ID)
			})
			response.end(errorPage(error.error && error.error.error_description || errors.UNKNOWN))
		}
	}
}

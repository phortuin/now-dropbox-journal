const cookie = require('../../lib/cookie')
const dropbox = require('../../lib/dropbox-instance')
const errorPage = require('../../lib/error-page')
const redirectUrl = require('../../lib/redirect-url')
const { errors, cookies, redirects, queryParams } = require('../../lib/constants')
const { createUserSession } = require('../../lib/session')

module.exports = async (request, response) => {
	const code = request.query[queryParams.CODE]
	const state = request.query[queryParams.STATE]
	const stateFromCookie = request.cookies[cookies.STATE]

	if (!code || !state) {
		response.writeHead(403)
		response.end(errorPage(errors.NO_CODE))
	}

	if (state !== stateFromCookie) {
		response.writeHead(403)
		response.end(errorPage(errors.INVALID_STATE))
	}

	try {
		const token = await dropbox.getToken(redirectUrl(request), code)
		const sessionId = await createUserSession({ token })
		response.writeHead(302, {
			Location: redirects.DEFAULT,
			'Set-Cookie': cookie.set(cookies.SESSION_ID, sessionId)
		})
		response.end()
	} catch (error) {
		response.writeHead(error.status || 500, {
			'Set-Cookie': cookie.clear(cookies.SESSION_ID)
		})
		response.end(errorPage(error.error && error.error.error_description || errors.UNKNOWN))
	}
}

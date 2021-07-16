const cookie = require('../lib/cookie')
const { cookies } = require('../lib/constants')
const { deleteUserSession } = require('../lib/redis-instance')

module.exports = async (request, response) => {
	if (request.method === 'POST') {
		const sessionId = request.cookies[cookies.SESSION_ID]
		await deleteUserSession(sessionId)
		response.writeHead(205, {
			'Set-Cookie': cookie.clear(cookies.SESSION_ID),
		})
		response.end()
	} else {
		response.writeHead(405, {
			'Allow': 'POST'
		})
		response.end()
	}
}

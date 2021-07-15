const cookie = require('../lib/cookie')
const { cookies } = require('../lib/constants')

module.exports = (request, response) => {
	if (request.method === 'POST') {
		response.writeHead(205, {
			'Set-Cookie': cookie.clear(cookies.TOKEN),
		})
		response.end()
	} else {
		response.writeHead(405, {
			'Allow': 'POST'
		})
		response.end()
	}
}

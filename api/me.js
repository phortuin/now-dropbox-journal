const middleware = require('../lib/middleware')
const dropbox = require('../lib/dropbox-instance')
const { cookies, errors } = require('../lib/constants')

module.exports = middleware.authenticate(async (request, response) => {
	try {
		response.json(await dropbox.user())
	} catch (error) {
		response.status(error.status || 500)
		response.json({ error: error.error.error_description || error.error || errors.UNKNOWN })
	}
})

const { authenticate, handleErrors, handleByMethod } = require('../lib/middleware')
const { cookies, errors, settings } = require('../lib/constants')
const { getUserSession, updateUserSession } = require('../lib/session')

module.exports = handleErrors(authenticate(handleByMethod({ get, post })))

async function get(req, res) {
	const sessionId = req.cookies[cookies.SESSION_ID]
	const sessionData = await getUserSession(sessionId)
	delete sessionData.token // Shouldn’t be sent to client
	res.json(sessionData)
}

async function post(req, res) {
	const sessionId = req.cookies[cookies.SESSION_ID]
	await updateUserSession(sessionId, req.body)
	res.status(204)
	res.end()
}

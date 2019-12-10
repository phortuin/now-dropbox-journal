const crypto = require('crypto')
const Dropbox = require('dropbox').Dropbox
const fetch = require('node-fetch')

function generateRandomString() {
    return crypto.randomBytes(16).toString('hex')
}

function getRedirectUrl(request) {
    return `${request.headers['x-forwarded-proto']}://${request.headers.host}/auth`
}

// Dropbox authentication URL should be requested with code instead of token
// for non-implicit grants
// https://www.dropboxforum.com/t5/API-Support-Feedback/How-to-authenticate-with-a-Dropbox-account-via-oauth2-from-my/m-p/335761/highlight/true#M19570
const AUTH_TYPE = 'code'

module.exports = (request, response) => {
    const dropbox = new Dropbox({
        fetch,
        clientId: process.env.DROPBOX_APP_KEY,
        clientSecret: process.env.DROPBOX_APP_SECRET,
    })

    const token = request.cookies.access_token

    if (token) {
        response.writeHead(302, {
            'Set-Cookie': `state=deleted; HttpOnly; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        })
        response.end('got token')
    } else {
        const state = generateRandomString()
        const authUrl = dropbox.getAuthenticationUrl(
            getRedirectUrl(request),
            state,
            AUTH_TYPE
        )
        response.writeHead(302, {
            Location: authUrl,
            'Set-Cookie': `state=${state}; HttpOnly; SameSite=Lax` // add Secure for prod?
        })
        response.end('Redirecting to Dropbox...')
    }
}

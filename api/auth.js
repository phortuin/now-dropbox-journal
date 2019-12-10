const { parse } = require('url');
const Dropbox = require('dropbox').Dropbox
const fetch = require('node-fetch')

function getRedirectUrl(request) {
    return `${request.headers['x-forwarded-proto']}://${request.headers.host}/auth`
}

module.exports = async (request, response) => {
    const dropbox = new Dropbox({
        fetch,
        clientId: process.env.DROPBOX_APP_KEY,
        clientSecret: process.env.DROPBOX_APP_SECRET,
    })

    const code = request.query.code
    const state = request.query.state

    const stateFromCookie = request.cookies.state

    if (!code || !state) {
        response.writeHead(403)
        response.end('No code or state found')
    }

    if (state !== stateFromCookie) {
        response.writeHead(403)
        response.end('Invalid state')
    }

    const token = await dropbox.getAccessTokenFromCode(getRedirectUrl(request), code)

    response.writeHead(302, {
        Location: '/',
        'Set-Cookie': `access_token=${token}; HttpOnly; SameSite=Lax` // add Secure for prod?
    })
    response.end('Authenticating...')
}

const { redirects } = require('./constants')

module.exports = request => {
    return `${request.headers['x-forwarded-proto']}://${request.headers.host}${redirects.API_TOKEN}`
}

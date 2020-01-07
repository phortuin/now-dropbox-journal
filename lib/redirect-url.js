module.exports = request => {
    return `${request.headers['x-forwarded-proto']}://${request.headers.host}/api/auth`
}

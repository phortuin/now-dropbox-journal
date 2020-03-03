const Dropbox = require('dropbox').Dropbox
const fetch = require('node-fetch')

const dropbox = new Dropbox({
	fetch,
	clientId: process.env.DROPBOX_APP_KEY,
	clientSecret: process.env.DROPBOX_APP_SECRET,
})

module.exports = {
	authUrl(redirectUrl, state) {
		return dropbox.getAuthenticationUrl(redirectUrl, state, 'code')
	},
	async contents(path) {
		const file = await dropbox.filesDownload({ path })
		return file.fileBinary.toString('utf8')
	},
	getToken(redirectUrl, code) {
		return dropbox.getAccessTokenFromCode(redirectUrl, code)
	},
	save(contents, path) {
		return dropbox.filesUpload({
			contents,
			path,
			mode: 'overwrite'
		})
	},
	setToken(token) {
		return dropbox.setAccessToken(token)
	},
	user() {
		return dropbox.usersGetCurrentAccount()
	},
}

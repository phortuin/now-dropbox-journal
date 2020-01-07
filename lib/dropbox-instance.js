const Dropbox = require('dropbox').Dropbox
const fetch = require('node-fetch')

module.exports = new Dropbox({
	fetch,
	clientId: process.env.DROPBOX_APP_KEY,
	clientSecret: process.env.DROPBOX_APP_SECRET,
})


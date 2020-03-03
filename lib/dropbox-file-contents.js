module.exports = async (dropboxInstance, path) => {
	try {
		const file = await dropboxInstance.filesDownload({ path })
		return file.fileBinary.toString('utf-8')
	} catch(error) {
		console.error(error)
		return ""
	}
}

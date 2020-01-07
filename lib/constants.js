export const cookies = {
	TOKEN: 'access_token',
	STATE: 'state',
}

export const errors = {
	NO_CODE: 'No code or state found',
	INVALID_STATE: 'Invalid state; clear your cookies and try again',
	UNKNOWN: 'Unknown error',
}

export const redirects = {
	DEFAULT: '/',
	API_TOKEN: '/api/token',
}

export const queryParams = {
	CODE: 'code',
	STATE: 'state',
}

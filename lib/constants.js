export const cookies = {
	STATE: 'state',
	SESSION_ID: 'session_id',
}

export const settings = {
	FILE_LOCATION: 'fileLocation',
	PREPEND: 'prepend',
	DATE_FORMAT: 'dateFormat',
}

export const localStorageItems = {
	ENTRY: 'entry',
	DATE: 'date',
}

export const errors = {
	NO_CODE: 'No code or state found',
	INVALID_STATE: 'Invalid state; clear your cookies and try again',
	UNKNOWN: 'Unknown error',
	NOT_AUTHENTICATED: 'Not authenticated',
	UNKNOWN_PATH: 'File location not set',
}

export const redirects = {
	DEFAULT: '/',
	API_TOKEN: '/api/token',
}

export const queryParams = {
	CODE: 'code',
	STATE: 'state',
}

export const storageTypes = {
	COOKIE: 'cookie',
	LOCAL_STORAGE: 'localStorage',
}

export const dateFormats = {
	DAY_MONTH: 'dm',
	DAY_MONTH_YEAR: 'dmy',
}

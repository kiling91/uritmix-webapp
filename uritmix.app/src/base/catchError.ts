import { StatusCodes } from 'http-status-codes'

export const catchHttp = (error: any, addError: (error: string) => void) => {
	console.log('*** Error ***')
	console.log(JSON.stringify(error))

	if (typeof error === 'string' || error instanceof String) {
		addError(error as string)
		return
	}

	if (error.message && !error.response) {
		addError(error.message)
		return
	}

	let resp = error.response

	console.log('*** response ***')
	console.log(JSON.stringify(error.response))
	console.log('*** ***')

	if (resp.status == StatusCodes.BAD_REQUEST) {
		addError('Bad request')
	} else if (resp.status == StatusCodes.BAD_GATEWAY) {
		addError('Bad gateway')
	} else if (resp.status == StatusCodes.GATEWAY_TIMEOUT) {
		addError('Gateway timeout')
	} else if (resp.status == StatusCodes.UNAUTHORIZED) {
		addError('Unauthorized')
	} else if (resp.status == StatusCodes.FORBIDDEN) {
		addError('Forbidden')
	} else if (resp.status == StatusCodes.INTERNAL_SERVER_ERROR) {
		addError('Internal server error')
	} else if (resp.status == StatusCodes.UNPROCESSABLE_ENTITY) {
		for (let key in resp.data)
			if (resp.data.hasOwnProperty(key)) {
				resp.data[key].forEach((error: string) => {
					addError(error)
				})
			}
	} else {
		addError(resp.status)
		if (resp.data) console.log(resp.data)
		Promise.reject(error)
	}
}

export const checkErrors = (result: any) => {
	if (result && !result.data.ok) {
		throw result.data.Metadata.Message || 'Неизвестная ошибка'
	}
}

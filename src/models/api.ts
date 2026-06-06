export interface ApiResult<T> {
	data?: T
	error?: string
	status?: number
}

export class ApiError extends Error {
	status?: number

	constructor(message: string, status?: number) {
		super(message)
		this.name = 'ApiError'
		this.status = status
	}
}

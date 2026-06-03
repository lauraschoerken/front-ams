import { ApiError } from '@/models/api'

const API_BASE_URL = (import.meta.env.VITE_API_BASE ?? 'https://itx-frontend-test.onrender.com').replace(
	/\/$/,
	''
)

interface RequestOptions extends RequestInit {
	signal?: AbortSignal
}

export const requestJson = async <T>(path: string, options?: RequestOptions): Promise<T> => {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
		...options,
	})

	if (!response.ok) {
		throw new ApiError(`HTTP ${response.status}`, response.status)
	}

	return (await response.json()) as T
}

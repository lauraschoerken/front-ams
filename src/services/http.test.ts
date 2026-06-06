import { afterEach, describe, expect, it, vi } from 'vitest'

import { requestJson } from './http'

const okJsonResponse = new Response(JSON.stringify({ ok: true }), {
	status: 200,
	headers: { 'Content-Type': 'application/json' },
})

describe('requestJson', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
	})

	it('merges default and custom headers safely', async () => {
		const fetchMock = vi.fn().mockResolvedValue(okJsonResponse)
		vi.stubGlobal('fetch', fetchMock)

		await requestJson('/api/test', {
			headers: {
				Authorization: 'Bearer token',
			},
		})

		const headers = fetchMock.mock.calls[0][1]?.headers as Headers

		expect(headers.get('Content-Type')).toBe('application/json')
		expect(headers.get('Authorization')).toBe('Bearer token')
	})
})

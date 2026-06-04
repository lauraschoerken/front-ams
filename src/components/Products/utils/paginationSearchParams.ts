const PAGE_PARAM = 'page'

export const getPageFromSearchParams = (searchParams: URLSearchParams) => {
	const page = Number(searchParams.get(PAGE_PARAM))

	return Number.isInteger(page) && page > 1 ? page : 1
}

export const setPageInSearchParams = (searchParams: URLSearchParams, page: number) => {
	const nextSearchParams = new URLSearchParams(searchParams)

	if (page <= 1) {
		nextSearchParams.delete(PAGE_PARAM)
	} else {
		nextSearchParams.set(PAGE_PARAM, String(page))
	}

	return nextSearchParams
}

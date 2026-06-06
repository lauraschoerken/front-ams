const PAGE_PARAM = 'page'
const SEARCH_PARAM = 'q'

export const getSearchFromSearchParams = (searchParams: URLSearchParams) =>
	searchParams.get(SEARCH_PARAM) ?? ''

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

export const setSearchInSearchParams = (searchParams: URLSearchParams, search: string) => {
	const nextSearchParams = new URLSearchParams(searchParams)
	const normalizedSearch = search.trim()

	if (normalizedSearch) {
		nextSearchParams.set(SEARCH_PARAM, normalizedSearch)
	} else {
		nextSearchParams.delete(SEARCH_PARAM)
	}

	nextSearchParams.delete(PAGE_PARAM)

	return nextSearchParams
}

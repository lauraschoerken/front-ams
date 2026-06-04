export type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end'

const VISIBLE_PAGES_AROUND_CURRENT = 3

export const getPaginationItems = (
	currentPage: number,
	totalPages: number
): PaginationItem[] => {
	if (totalPages <= 1) return [1]

	const firstVisiblePage = Math.max(2, currentPage - VISIBLE_PAGES_AROUND_CURRENT)
	const lastVisiblePage = Math.min(totalPages - 1, currentPage + VISIBLE_PAGES_AROUND_CURRENT)
	const items: PaginationItem[] = [1]

	if (firstVisiblePage > 2) {
		items.push('ellipsis-start')
	}

	for (let page = firstVisiblePage; page <= lastVisiblePage; page += 1) {
		items.push(page)
	}

	if (lastVisiblePage < totalPages - 1) {
		items.push('ellipsis-end')
	}

	items.push(totalPages)

	return items
}

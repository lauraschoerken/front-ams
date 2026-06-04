const CART_COUNT_KEY = 'front-ams:cart:count'

const isStorageAvailable = () => typeof window !== 'undefined' && Boolean(window.localStorage)

export const getStoredCartCount = () => {
	if (!isStorageAvailable()) return 0

	const value = window.localStorage.getItem(CART_COUNT_KEY)
	const count = value ? Number(value) : 0

	return Number.isFinite(count) ? count : 0
}

export const storeCartCount = (count: number) => {
	if (!isStorageAvailable()) return

	window.localStorage.setItem(CART_COUNT_KEY, String(count))
}

const DEFAULT_TTL = 60 * 60 * 1000

interface CachedItem<T> {
	value: T
	expiresAt: number
}

export interface CacheEntry<T> {
	value: T
	isStale: boolean
}

const isStorageAvailable = () => typeof window !== 'undefined' && Boolean(window.localStorage)

export const cacheStorage = {
	getEntry<T>(key: string): CacheEntry<T> | undefined {
		if (!isStorageAvailable()) return undefined

		try {
			const rawValue = window.localStorage.getItem(key)
			if (!rawValue) return undefined

			const cachedItem = JSON.parse(rawValue) as CachedItem<T>
			return {
				value: cachedItem.value,
				isStale: Date.now() > cachedItem.expiresAt,
			}
		} catch {
			window.localStorage.removeItem(key)
			return undefined
		}
	},

	get<T>(key: string): T | undefined {
		const entry = this.getEntry<T>(key)
		return entry && !entry.isStale ? entry.value : undefined
	},

	set<T>(key: string, value: T, ttl = DEFAULT_TTL) {
		if (!isStorageAvailable()) return

		const cachedItem: CachedItem<T> = {
			value,
			expiresAt: Date.now() + ttl,
		}

		window.localStorage.setItem(key, JSON.stringify(cachedItem))
	},

	remove(key: string) {
		if (!isStorageAvailable()) return

		window.localStorage.removeItem(key)
	},
}

export const CACHE_TTL = DEFAULT_TTL

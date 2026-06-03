/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE?: string
	readonly VITE_API_MODE?: 'mock' | 'real'
	readonly VITE_APP_NAME?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

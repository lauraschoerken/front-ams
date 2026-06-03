export interface ProductSummary {
	id: string
	brand: string
	model: string
	price: string | number
	imgUrl: string
}

export interface ProductOption {
	code: number
	name: string
}

export interface ProductOptions {
	colors: ProductOption[]
	storages: ProductOption[]
}

export interface ProductDetail extends ProductSummary {
	cpu: string
	ram: string
	os: string
	displayResolution: string
	battery: string
	primaryCamera: string | string[]
	secondaryCmera?: string | string[]
	secondaryCamera?: string | string[]
	dimentions?: string
	dimensions?: string
	weight: string | number
	options: ProductOptions
}

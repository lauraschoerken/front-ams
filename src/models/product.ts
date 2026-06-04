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
	networkTechnology?: string
	networkSpeed?: string
	gprs?: string
	edge?: string
	announced?: string
	status?: string
	sim?: string
	displayType?: string
	displaySize?: string
	chipset?: string
	gpu?: string
	externalMemory?: string
	internalMemory?: string | string[]
	secondaryCmera?: string | string[]
	secondaryCamera?: string | string[]
	dimentions?: string
	dimensions?: string
	weight: string | number
	speaker?: string
	audioJack?: string
	wlan?: string | string[]
	bluetooth?: string | string[]
	gps?: string
	nfc?: string
	radio?: string
	usb?: string
	sensors?: string | string[]
	colors?: string | string[]
	options: ProductOptions
}

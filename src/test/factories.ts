import type { AddCartPayload } from '@/models/cart'
import type { ProductDetail, ProductSummary } from '@/models/product'

export const createProduct = (overrides: Partial<ProductSummary> = {}): ProductSummary => ({
	id: 'product-1',
	brand: 'Test brand',
	model: 'Test model',
	price: '300',
	imgUrl: 'product.jpg',
	...overrides,
})

export const createProductDetail = (overrides: Partial<ProductDetail> = {}): ProductDetail => ({
	...createProduct(),
	cpu: 'Test CPU',
	ram: '8 GB',
	os: 'Test OS',
	displayResolution: '1080 x 1920',
	battery: '3000 mAh',
	primaryCamera: '12 MP',
	weight: '150',
	options: {
		colors: [{ code: 1000, name: 'Black' }],
		storages: [{ code: 2000, name: '64 GB' }],
	},
	...overrides,
})

export const createCartPayload = (overrides: Partial<AddCartPayload> = {}): AddCartPayload => ({
	id: 'product-1',
	colorCode: 1000,
	storageCode: 2000,
	...overrides,
})

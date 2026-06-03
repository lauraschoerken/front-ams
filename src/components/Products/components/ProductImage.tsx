import './ProductImage.scss'

interface ProductImageProps {
	src: string
	alt: string
}

export const ProductImage = ({ src, alt }: ProductImageProps) => (
	<div className='product-image'>
		<img src={src} alt={alt} />
	</div>
)

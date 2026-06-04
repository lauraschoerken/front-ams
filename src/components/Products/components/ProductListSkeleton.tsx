import './ProductListSkeleton.scss'

interface ProductListSkeletonProps {
	label: string
}

const SKELETON_ITEMS = 8

export const ProductListSkeleton = ({ label }: ProductListSkeletonProps) => (
	<div className='product-list-skeleton' aria-label={label} aria-busy='true'>
		{Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
			<div className='product-list-skeleton__card' key={index}>
				<div className='product-list-skeleton__image product-list-skeleton__block' />
				<div className='product-list-skeleton__content'>
					<div className='product-list-skeleton__text'>
						<div className='product-list-skeleton__block product-list-skeleton__line product-list-skeleton__line--brand' />
						<div className='product-list-skeleton__block product-list-skeleton__line product-list-skeleton__line--model' />
					</div>
					<div className='product-list-skeleton__block product-list-skeleton__line product-list-skeleton__line--price' />
				</div>
			</div>
		))}
	</div>
)

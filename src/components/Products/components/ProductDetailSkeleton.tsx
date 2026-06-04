import './ProductDetailSkeleton.scss'

interface ProductDetailSkeletonProps {
	label: string
}

export const ProductDetailSkeleton = ({ label }: ProductDetailSkeletonProps) => (
	<div className='product-detail-skeleton' aria-label={label} aria-busy='true'>
		<div className='product-detail-skeleton__image product-detail-skeleton__block' />

		<div className='product-detail-skeleton__content'>
			<div className='product-detail-skeleton__header'>
				<div className='product-detail-skeleton__block product-detail-skeleton__line product-detail-skeleton__line--brand' />
				<div className='product-detail-skeleton__heading'>
					<div className='product-detail-skeleton__block product-detail-skeleton__line product-detail-skeleton__line--title' />
					<div className='product-detail-skeleton__block product-detail-skeleton__line product-detail-skeleton__line--price' />
				</div>
			</div>

			<div className='product-detail-skeleton__description'>
				<div className='product-detail-skeleton__block product-detail-skeleton__line product-detail-skeleton__line--section' />
				<div className='product-detail-skeleton__rows'>
					{Array.from({ length: 8 }).map((_, index) => (
						<div className='product-detail-skeleton__row' key={index}>
							<div className='product-detail-skeleton__block product-detail-skeleton__line product-detail-skeleton__line--label' />
							<div className='product-detail-skeleton__block product-detail-skeleton__line product-detail-skeleton__line--value' />
						</div>
					))}
				</div>
			</div>

			<div className='product-detail-skeleton__actions'>
				<div className='product-detail-skeleton__block product-detail-skeleton__line product-detail-skeleton__line--section' />
				<div className='product-detail-skeleton__block product-detail-skeleton__control' />
				<div className='product-detail-skeleton__block product-detail-skeleton__control' />
				<div className='product-detail-skeleton__block product-detail-skeleton__button' />
			</div>
		</div>
	</div>
)

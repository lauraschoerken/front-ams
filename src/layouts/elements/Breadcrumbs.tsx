import './Breadcrumbs.scss'

import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

interface ProductLocationState {
	productListPath?: string
}

interface BreadcrumbsProps {
	productDetailLabel?: string
}

export const Breadcrumbs = ({ productDetailLabel }: BreadcrumbsProps) => {
	const { t } = useTranslation()
	const { pathname, state } = useLocation()
	const locationState = state as ProductLocationState | null
	const productListPath =
		typeof locationState?.productListPath === 'string' &&
		locationState.productListPath.startsWith('/')
			? locationState.productListPath
			: '/'

	if (!pathname.startsWith('/product/')) return null

	const breadcrumbs = [
		{ label: t('products'), to: productListPath },
		{ label: productDetailLabel ?? t('productDetail.loading'), to: pathname },
	]

	return (
		<nav className='breadcrumbs' aria-label={t('breadcrumb')}>
			<ol className='breadcrumbs__list'>
				{breadcrumbs.map((breadcrumb, index) => {
					const isLast = index === breadcrumbs.length - 1

					return (
						<li className='breadcrumbs__item' key={breadcrumb.to}>
							{isLast ? (
								<span aria-current='page'>{breadcrumb.label}</span>
							) : (
								<Link to={breadcrumb.to}>{breadcrumb.label}</Link>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}

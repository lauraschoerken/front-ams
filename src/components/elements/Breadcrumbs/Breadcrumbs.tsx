import './Breadcrumbs.scss'

import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

const getBreadcrumbs = (pathname: string, labels: Record<string, string>) => {
	if (pathname.startsWith('/product/')) {
		return [
			{ label: labels.products, to: '/' },
			{ label: labels.detail, to: pathname },
		]
	}

	return [{ label: labels[pathname] ?? labels.products, to: pathname }]
}

export const Breadcrumbs = () => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const breadcrumbs = getBreadcrumbs(pathname, {
		'/': t('products'),
		'/demo': t('demo'),
		detail: t('detail'),
		products: t('products'),
	})

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

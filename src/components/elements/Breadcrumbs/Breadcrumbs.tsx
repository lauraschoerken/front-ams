import './Breadcrumbs.scss'

import { Link, useLocation } from 'react-router-dom'

const routeLabels: Record<string, string> = {
	'/': 'Productos',
	'/demo': 'Demo',
}

const getBreadcrumbs = (pathname: string) => {
	if (pathname.startsWith('/product/')) {
		return [
			{ label: routeLabels['/'], to: '/' },
			{ label: 'Detalle', to: pathname },
		]
	}

	return [{ label: routeLabels[pathname] ?? 'Productos', to: pathname }]
}

export const Breadcrumbs = () => {
	const { pathname } = useLocation()
	const breadcrumbs = getBreadcrumbs(pathname)

	return (
		<nav className='breadcrumbs' aria-label='Breadcrumb'>
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

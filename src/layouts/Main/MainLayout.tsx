import '../layout.scss'

import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Footer } from '../elements/Footer'
import { Header } from '../elements/Header'

export const MainLayout = () => {
	const { pathname } = useLocation()
	const [productDetailLabel, setProductDetailLabel] = useState<string | undefined>()

	useEffect(() => {
		setProductDetailLabel(undefined)
	}, [pathname])

	return (
		<div className='main-layout'>
			<Header productDetailLabel={productDetailLabel} />
			<main className='main container'>
				<Outlet context={{ setProductDetailLabel }} />
			</main>
			<Footer />
		</div>
	)
}

import '../layout.scss'

import { Outlet } from 'react-router-dom'

import { Breadcrumbs } from '@/components/elements'

import { Footer } from '../elements/Footer'
import { Header } from '../elements/Header'

export const MainLayout = () => {
	return (
		<div className='main-layout'>
			<Header />
			<main className='main container'>
				<Breadcrumbs />
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

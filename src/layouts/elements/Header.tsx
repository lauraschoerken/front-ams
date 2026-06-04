import '../layout.scss'

import { ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import { useCart } from '@/components/Cart/context/CartContext'
import LanguageSelect from '@/components/elements/Languague/LanguagueSelect'
import { ThemeToggle } from '@/components/elements/Theme/ThemeToggle'
import { APP_NAME } from '@/utils/constants'

import { Breadcrumbs } from './Breadcrumbs'

interface HeaderProps {
	productDetailLabel?: string
}

export const Header = ({ productDetailLabel }: HeaderProps) => {
	const active = 'link-active'
	const { t } = useTranslation()
	const { count } = useCart()

	return (
		<header className='header'>
			<div className='container header__inner'>
				<Link to='/' className='link brand'>
					{APP_NAME}
				</Link>
				<nav className='nav'>
					<NavLink to='/' end className={({ isActive }) => (isActive ? active : 'link')}>
						{t('products')}
					</NavLink>
					<span className='cart-indicator' aria-label={t('cartItems')} title={t('cart')}>
						<ShoppingCart aria-hidden='true' size={20} strokeWidth={1.8} />
						<span className='cart-indicator__count'>{count}</span>
					</span>
					<ThemeToggle />
					<LanguageSelect />
				</nav>
			</div>
			<div className='container'>
				<Breadcrumbs productDetailLabel={productDetailLabel} />
			</div>
		</header>
	)
}

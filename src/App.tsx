import '@/assets/styles/index.scss'

import { RouterProvider } from 'react-router-dom'

import { CartProvider } from '@/components/Cart/context/CartContext'

import { I18nProvider } from './i18n/I18nProvider'
import { router } from './navigation/routes'
import { ThemeProvider } from './utils/Theme/themeProvider'

export default function App() {
	return (
		<ThemeProvider>
			<I18nProvider>
				<CartProvider>
					<RouterProvider router={router} />
				</CartProvider>
			</I18nProvider>
		</ThemeProvider>
	)
}

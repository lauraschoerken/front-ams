import '../layout.scss'

import { APP_NAME } from '@/utils/constants'

export const Footer = () => {
	return (
		<footer className='footer'>
			{APP_NAME} · {new Date().getFullYear()}
		</footer>
	)
}

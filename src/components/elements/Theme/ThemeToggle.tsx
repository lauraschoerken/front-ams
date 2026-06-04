import './ThemeToggle.scss'

import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { ThemeContext } from '@/utils/Theme/theme-context'

import { MoonIcon, SunIcon } from './icons'

export const ThemeToggle = () => {
	const { t } = useTranslation()
	const { theme, toggle } = useContext(ThemeContext)

	return (
		<button className={`theme-toggle ${theme}`} onClick={toggle} aria-label={t('themeToggle')}>
			<span className='icon'>{theme === 'light' ? <SunIcon /> : <MoonIcon />}</span>
		</button>
	)
}

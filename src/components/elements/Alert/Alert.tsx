import './Alert.scss'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface AlertProps {
	children: React.ReactNode
	variant?: 'success' | 'error'
	onClose?: () => void
	autoCloseMs?: number
}

export const Alert = ({ children, variant = 'success', onClose, autoCloseMs = 10_000 }: AlertProps) => {
	const { t } = useTranslation()

	useEffect(() => {
		if (!onClose || autoCloseMs <= 0) return

		const timeoutId = window.setTimeout(onClose, autoCloseMs)

		return () => window.clearTimeout(timeoutId)
	}, [autoCloseMs, onClose])

	return (
		<div className={`alert alert--${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
			<p>{children}</p>
			{onClose && (
				<button type='button' className='alert__close' onClick={onClose} aria-label={t('close')}>
					×
				</button>
			)}
		</div>
	)
}

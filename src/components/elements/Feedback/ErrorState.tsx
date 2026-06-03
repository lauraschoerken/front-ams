import { useTranslation } from 'react-i18next'

interface ErrorStateProps {
	message: string
	onRetry?: () => void
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
	const { t } = useTranslation()

	return (
		<div className='feedback-state feedback-state--error' role='alert'>
			<p className='feedback-state__title'>{t('feedback.loadError')}</p>
			<p className='feedback-state__description'>{message}</p>
			{onRetry && (
				<button className='feedback-state__button' type='button' onClick={onRetry}>
					{t('feedback.retry')}
				</button>
			)}
		</div>
	)
}

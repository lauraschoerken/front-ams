import { useTranslation } from 'react-i18next'

interface LoadingStateProps {
	label?: string
}

export const LoadingState = ({ label }: LoadingStateProps) => {
	const { t } = useTranslation()

	return (
		<div className='feedback-state' aria-live='polite'>
			<span className='spinner' aria-hidden='true' />
			<span>{label ?? t('feedback.loading')}</span>
		</div>
	)
}

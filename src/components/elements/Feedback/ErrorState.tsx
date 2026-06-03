interface ErrorStateProps {
	message: string
	onRetry?: () => void
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
	<div className='feedback-state feedback-state--error' role='alert'>
		<p className='feedback-state__title'>No se han podido cargar los datos</p>
		<p className='feedback-state__description'>{message}</p>
		{onRetry && (
			<button className='feedback-state__button' type='button' onClick={onRetry}>
				Reintentar
			</button>
		)}
	</div>
)

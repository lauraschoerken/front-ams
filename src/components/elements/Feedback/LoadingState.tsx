interface LoadingStateProps {
	label?: string
}

export const LoadingState = ({ label = 'Cargando' }: LoadingStateProps) => (
	<div className='feedback-state' aria-live='polite'>
		<span className='spinner' aria-hidden='true' />
		<span>{label}</span>
	</div>
)

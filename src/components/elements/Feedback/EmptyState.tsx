interface EmptyStateProps {
	title: string
	description?: string
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
	<div className='feedback-state'>
		<p className='feedback-state__title'>{title}</p>
		{description && <p className='feedback-state__description'>{description}</p>}
	</div>
)

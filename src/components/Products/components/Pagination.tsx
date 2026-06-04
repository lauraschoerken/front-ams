import './Pagination.scss'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getPaginationItems } from '../utils/getPaginationItems'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
	const { t } = useTranslation()
	const paginationItems = getPaginationItems(currentPage, totalPages)

	if (totalPages <= 1) return null

	return (
		<nav className='pagination' aria-label={t('pagination.label')}>
			<button
				className='pagination__button pagination__button--icon'
				type='button'
				disabled={currentPage === 1}
				aria-label={t('pagination.previous')}
				onClick={() => onPageChange(currentPage - 1)}>
				<ChevronLeft aria-hidden='true' size={18} />
			</button>

			<div className='pagination__pages'>
				{paginationItems.map((item) =>
					typeof item === 'number' ? (
						<button
							className={`pagination__button ${item === currentPage ? 'is-active' : ''}`}
							type='button'
							key={item}
							aria-current={item === currentPage ? 'page' : undefined}
							aria-label={t('pagination.goToPage', { page: item })}
							onClick={() => onPageChange(item)}>
							{item}
						</button>
					) : (
						<span className='pagination__ellipsis' aria-hidden='true' key={item}>
							…
						</span>
					)
				)}
			</div>

			<span className='pagination__mobile-status'>
				{t('pagination.status', { current: currentPage, total: totalPages })}
			</span>

			<button
				className='pagination__button pagination__button--icon'
				type='button'
				disabled={currentPage === totalPages}
				aria-label={t('pagination.next')}
				onClick={() => onPageChange(currentPage + 1)}>
				<ChevronRight aria-hidden='true' size={18} />
			</button>
		</nav>
	)
}

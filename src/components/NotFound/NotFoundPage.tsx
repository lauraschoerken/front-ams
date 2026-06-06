import './NotFoundPage.scss'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
	const { t } = useTranslation()

	return (
		<section className='not-found-page'>
			<p className='not-found-page__eyebrow'>{t('notFound.eyebrow')}</p>
			<h1>{t('notFound.title')}</h1>
			<p>{t('notFound.description')}</p>
			<Link className='not-found-page__link' to='/'>
				{t('notFound.backToProducts')}
			</Link>
		</section>
	)
}

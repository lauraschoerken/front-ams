import './Search.scss'

interface SearchProps {
	value: string
	onChange: (value: string) => void
}

export const Search = ({ value, onChange }: SearchProps) => (
	<div className='product-search'>
		<label className='product-search__label' htmlFor='product-search'>
			Buscar por marca o modelo
		</label>
		<input
			className='product-search__input'
			id='product-search'
			type='search'
			value={value}
			onChange={(event) => onChange(event.target.value)}
			placeholder='Ej. Apple, Galaxy...'
		/>
	</div>
)

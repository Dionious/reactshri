import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Select, {StylesConfig} from 'react-select';
import styles from './styles/GenresFilter.module.css';
import CustomDropdownIndicator from './CustomDropdownIndicator'; // Импорт вашего компонента

interface OptionType {
	value: string;
	label: string;
}

const genres: OptionType[] = [
	{ value: '', label: 'Не выбран' },
	{ value: 'comedy', label: 'Комедия' },
	{ value: 'drama', label: 'Драма' },
	{ value: 'action', label: 'Боевик' },
	{ value: 'thriller', label: 'Триллер' },
	{ value: 'horror', label: 'Ужасы' },
	{ value: 'family', label: 'Семейный' },
	{ value: 'cartoon', label: 'Анимированный' },
	{ value: 'fantasy', label: 'Фэнтези' },
	{ value: 'romance', label: 'Романтика' },
	{ value: 'adventure', label: 'Приключения' },
	{ value: 'musical', label: 'Мьюзикл' },
	{ value: 'war', label: 'Военный' },
];

const customStyles: StylesConfig<OptionType> = {
	control: (provided,state) => ({
		...provided,
		borderRadius: '8px',
		boxShadow: 'none',
		borderColor: state.menuIsOpen ? '#FF5500' : '#ccc', // Изменение цвета границы при открытом меню
		'&:hover': {
			borderColor: state.menuIsOpen ? '#FF5500' : '#aaa', // Изменение цвета границы при наведении и открытом меню
		},
	}),
	menu: (provided) => ({
		...provided,
		borderRadius: '8px',
	}),
	menuList: (provided) => ({
		...provided,
		maxHeight: 'none', // Опционально: если не нужен ограничивающий максимальный размер
	}),
	option: (provided, state) => ({
		...provided,
		color: state.isSelected ? 'white' : 'black',
	}),
};

const GenresFilter: React.FC = () => {
	// const navigate = useNavigate();
	// const location = useLocation();

	const queryParams = queryString.parse(location.search);
	const initialSelectedGenre = genres.find((genre) => genre.value === queryParams.genre?.toString()) || null;
	const [selectedGenre, setSelectedGenre] = useState<OptionType | null>(initialSelectedGenre);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	const handleGenreChange = (selectedOption: OptionType | null) => {
		selectedOption?.value === '' ? setSelectedGenre(null) : setSelectedGenre(selectedOption);
	};

	// const updateQueryParams = (params: { [key: string]: string }) => {
	// 	const newParams = {
	// 		...queryString.parse(location.search),
	// 		...params,
	// 	};
	// 	const search = queryString.stringify(newParams);
	// 	navigate({ search }, { replace: true });
	// };

	// useEffect(() => {
	// 	const { genre } = queryString.parse(location.search);
	// 	if (genre) {
	// 		const selected = GENRES.find(g => g.value === genre.toString());
	// 		setSelectedGenre(selected || { value: '0', label: 'Не выбран' });
	// 	}
	// }, [location.search]);

	return (
		<div>
			<label className={styles['genre-label']}>
				Жанр

			</label>
			<Select
				value={selectedGenre}
				onChange={handleGenreChange}
				options={genres}
				styles={customStyles}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator: (props) => <CustomDropdownIndicator {...props} menuIsOpen={menuIsOpen} />
				}}
				placeholder="Выберите жанр" // Placeholder для не выбранного состояния
				onMenuOpen={() => setMenuIsOpen(true)}
				onMenuClose={() => setMenuIsOpen(false)}
			/>
		</div>
	);
};

export default GenresFilter;

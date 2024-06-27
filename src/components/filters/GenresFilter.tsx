import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { StylesConfig } from 'react-select';
import styles from './styles/GenresFilter.module.css';
import CustomDropdownIndicator from './CustomDropdownIndicator';
import { setGenre } from '../../slices/filmsSlice';
import { RootState } from '../../store/store';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

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
	control: (provided, state) => ({
		...provided,
		borderRadius: '8px',
		boxShadow: 'none',
		borderColor: state.menuIsOpen ? '#FF5500' : '#ccc',
		'&:hover': {
			borderColor: state.menuIsOpen ? '#FF5500' : '#aaa',
		},
	}),
	menu: (provided) => ({
		...provided,
		borderRadius: '8px',
	}),
	menuList: (provided) => ({
		...provided,
		maxHeight: 'none',
	}),
	option: (provided, state) => ({
		...provided,
		color: state.isSelected ? 'white' : 'black',
	}),
};

const GenresFilter: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const queryParams = queryString.parse(location.search);
	const initialSelectedGenre = genres.find((genre) => genre.value === queryParams.genre?.toString()) || null;
	const [selectedGenre, setSelectedGenre] = useState<OptionType | null>(initialSelectedGenre);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (initialSelectedGenre) {
			dispatch(setGenre(initialSelectedGenre.value));
		}
	}, [initialSelectedGenre, dispatch]);

	const handleGenreChange = (selectedOption: OptionType | null) => {
		setSelectedGenre(selectedOption);

		const genreValue = selectedOption?.value || '';
		dispatch(setGenre(genreValue));
		updateQueryParams({ genre: genreValue });
	};

	const updateQueryParams = (params: { [key: string]: string }) => {
		const newParams = {
			...queryString.parse(location.search),
			...params,
		};
		const search = queryString.stringify(newParams, { skipEmptyString: true });
		navigate({ search }, { replace: true });
	};

	return (
		<div>
			<label className={styles['genre-label']}>Жанр</label>
			<Select
				value={selectedGenre}
				onChange={handleGenreChange}
				options={genres}
				styles={customStyles}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator: (props) => <CustomDropdownIndicator {...props} menuIsOpen={menuIsOpen} />,
				}}
				placeholder="Выберите жанр"
				onMenuOpen={() => setMenuIsOpen(true)}
				onMenuClose={() => setMenuIsOpen(false)}
			/>
		</div>
	);
};

export default GenresFilter;

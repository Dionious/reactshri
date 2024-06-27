import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Select, {StylesConfig} from 'react-select';
import styles from './styles/GenresFilter.module.css';
import CustomDropdownIndicator from './CustomDropdownIndicator';
import { setReleaseYear } from '../../api/filmsSlice';

interface OptionType {
    value: string;
    label: string;
}

const releaseYears: OptionType[] = [
	{ value: '', label: 'Не выбран' },
	{ value: '2009', label:  '2009' },
	{ value: '2008', label:  '2008' },
	{ value: '2007', label: '2007' },
	{ value: '2006', label: '2006' },
	{ value: '1990-2005', label: '1990-2005' },
	{ value: '1950-1989', label: '1950-1989' },
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

const ReleaseYearFilter: React.FC = () => {
	const dispatch = useDispatch();

	// const navigate = useNavigate();
	// const location = useLocation();

	const queryParams = queryString.parse(location.search);
	const initialSelectedGenre = releaseYears.find((genre) => genre.value === queryParams.genre?.toString()) || null;
	const [selectedGenre, setSelectedGenre] = useState<OptionType | null>(initialSelectedGenre);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	const handleGenreChange = (selectedOption: OptionType | null) => {
		selectedOption?.value === '' ? setSelectedGenre(null) : setSelectedGenre(selectedOption);
		dispatch(setReleaseYear(selectedOption?.value || ''));

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
				Год выпуска

			</label>
			<Select
				value={selectedGenre}
				onChange={handleGenreChange}
				options={releaseYears}
				styles={customStyles}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator: (props) => <CustomDropdownIndicator {...props} menuIsOpen={menuIsOpen} />
				}}
				placeholder="Выберите год" // Placeholder для не выбранного состояния
				onMenuOpen={() => setMenuIsOpen(true)}
				onMenuClose={() => setMenuIsOpen(false)}
			/>
		</div>
	);
};

export default ReleaseYearFilter;

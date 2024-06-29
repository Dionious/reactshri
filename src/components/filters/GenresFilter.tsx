import React, { useState, useEffect } from 'react';
import styles from './styles/GenresFilter.module.css';
import { setGenre } from '../../slices/filmsSlice';
import { useDispatch } from 'react-redux';
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

const GenresFilter: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const queryParams = queryString.parse(location.search);
	const initialSelectedGenre = genres.find((genre) => genre.value === queryParams.genre?.toString()) || null;
	const [selectedGenre, setSelectedGenre] = useState<OptionType | null>(initialSelectedGenre);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (initialSelectedGenre) {
			dispatch(setGenre(initialSelectedGenre.value));
		}
	}, [initialSelectedGenre, dispatch]);

	const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedOption = genres.find((genre) => genre.value === selectedValue) || null;
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

	const handleFocus = () => {
		setIsOpen(true);
	};

	const handleClick = (e) => {
		console.log(e);
		if (e.target.className.includes('open')) {
			setIsOpen(false);
		} else setIsOpen(true);
	};

	return (
		<div className={styles['genre-wrapper']}>
			<label className={styles['genre-label']}>Жанр</label>
			<select
				value={selectedGenre?.value || ''}
				onChange={handleGenreChange}
				className={`${styles['custom-select']} ${isOpen ? styles['open'] : ''}`}
				onClick={handleClick}
			>
				{genres.map((genre) => (
					<option key={genre.value} value={genre.value}>
						{genre.label}
					</option>
				))}
			</select>
			<span className={`${styles['icon']} ${isOpen ? styles['open'] : ''}`}></span>
		</div>
	);
};

export default GenresFilter;

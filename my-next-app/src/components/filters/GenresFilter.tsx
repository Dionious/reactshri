'use client';
import React, { useState, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';
import styles from './styles/GenresFilter.module.css';
import CustomDropdownIndicator from './CustomDropdownIndicator';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setGenre } from '@/slices/filmsSlice';

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

interface GenresFilterProps {
    initialGenre?: string;
}

const GenresFilter: React.FC<GenresFilterProps> = ({ initialGenre }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const initialGenreParam = searchParams.get('genre') || '';
	const [selectedGenre, setSelectedGenre] = useState<OptionType>({ value: '', label: 'Не выбран' });
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const initialGenreOption = genres.find((genre) => genre.value === initialGenreParam) || genres[0];
		setSelectedGenre(initialGenreOption);
	}, [initialGenreParam]);

	const handleGenreChange = (selectedOption: OptionType | null) => {
		if (selectedOption) {
			setSelectedGenre(selectedOption);
			const genreValue = selectedOption.value !== '' ? selectedOption.value : undefined;
			dispatch(setGenre(genreValue));

			const params = new URLSearchParams(searchParams);
			if (genreValue) {
				params.set('genre', genreValue);
			} else {
				params.delete('genre');
			}
			const pathname = `?${params.toString()}`;
			router.push(pathname);
		}
	};

	return (
		<div>
			<label className={styles['genre-label']}>Жанр</label>
			<Select
				instanceId={'genre'}
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

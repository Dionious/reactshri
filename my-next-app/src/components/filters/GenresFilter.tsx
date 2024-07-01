'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setGenre } from '@/slices/filmsSlice';
import styles from './styles/GenresFilter.module.css';

interface OptionType {
    value: string;
    label: string;
}

const genres: OptionType[] = [
	{ value: 'all', label: 'Не выбран' },
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
	const router = useRouter();
	const dispatch = useDispatch();
	const pathname = usePathname();
	const initialGenreParam = pathname.split('/')[1] || '';
	const initialYearParam = pathname.split('/')[2] || '';
	const [selectedGenre, setSelectedGenre] = useState<string>('');

	useEffect(() => {
		const initialGenreOption = genres.find((genre) => genre.value === initialGenreParam) || genres[0];
		setSelectedGenre(initialGenreOption.value);
		router.push(`${initialGenreOption.value}`);
	}, [initialGenreParam, router]);

	const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const genreValue = event.target.value;
		setSelectedGenre(genreValue);

		if (genreValue !== 'all') {
			dispatch(setGenre(genreValue));
		} else {
			dispatch(setGenre(''));
		}

		const newPath = genreValue ? `/${genreValue}/${initialYearParam}` : `/${initialYearParam}`;
		router.push(newPath);
	};

	return (
		<div>
			<label className={styles['genre-label']}>Жанр</label>
			<select
				value={selectedGenre}
				onChange={handleGenreChange}
				className={styles['custom-select']}
			>
				{genres.map((genre) => (
					<option key={genre.value} value={genre.value}>
						{genre.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default GenresFilter;

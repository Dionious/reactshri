'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles/ReleaseYearFilter.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setReleaseYear} from '@/slices/filmsSlice';

interface OptionType {
    value: string;
    label: string;
}

const releaseYears: OptionType[] = [
	{ value: 'all', label: 'Не выбран' },
	{ value: '2009', label: '2009' },
	{ value: '2008', label: '2008' },
	{ value: '2007', label: '2007' },
	{ value: '2006', label: '2006' },
	{ value: '1990-2005', label: '1990-2005' },
	{ value: '1950-1989', label: '1950-1989' },
];

const ReleaseYearFilter: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const pathname = usePathname();
	const initialGenreParam = pathname.split('/')[1] || '';
	const initialYearParam = pathname.split('/')[2] || '';
	const [selectedYear, setSelectedYear] = useState<OptionType>({ value: '', label: 'Не выбран' });

	useEffect(() => {
		const initialYearOption = releaseYears.find((year) => year.value === initialYearParam) || releaseYears[0];
		setSelectedYear(initialYearOption.value);
		const newPath = `/${initialGenreParam}/${initialYearOption.value}`;
		router.push(newPath);
	}, [initialGenreParam, initialYearParam, router]);

	const handleYearChange = (event) => {
		const yearValue = event.target.value;
		setSelectedYear(yearValue);
		if (yearValue !== 'all') {
			dispatch(setReleaseYear(yearValue.toString()));
		}
		else dispatch(setReleaseYear(''));

		const newPath = yearValue ? `/${initialGenreParam}/${yearValue}` : `/${initialGenreParam}`;
		router.push(newPath);
	};

	return (
		<div>
			<label className={styles['genre-label']}>Год выпуска</label>
			<select
				value={selectedYear}
				onChange={handleYearChange}
				className={styles['custom-select']}
			>
				{releaseYears.map((year) => (
					<option key={year.value} value={year.value}>
						{year.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default ReleaseYearFilter;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import styles from './styles/ReleaseYearFilter.module.css';
import { setReleaseYear } from '../../slices/filmsSlice';

interface OptionType {
    value: string;
    label: string;
}

const releaseYears: OptionType[] = [
	{ value: '', label: 'Не выбран' },
	{ value: '2009', label: '2009' },
	{ value: '2008', label: '2008' },
	{ value: '2007', label: '2007' },
	{ value: '2006', label: '2006' },
	{ value: '1990-2005', label: '1990-2005' },
	{ value: '1950-1989', label: '1950-1989' },
];

const ReleaseYearFilter: React.FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = queryString.parse(location.search);
	const initialSelectedYear = releaseYears.find(year => year.value === queryParams.releaseYear?.toString()) || null;
	const [selectedYear, setSelectedYear] = useState<OptionType | null>(initialSelectedYear);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (initialSelectedYear) {
			dispatch(setReleaseYear(initialSelectedYear.value));
		}
	}, [initialSelectedYear, dispatch]);

	const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedOption = releaseYears.find(year => year.value === selectedValue) || null;
		setSelectedYear(selectedOption);
		const yearValue = selectedOption?.value || '';
		dispatch(setReleaseYear(yearValue));

		const newParams = { ...queryString.parse(location.search), releaseYear: yearValue };
		const search = queryString.stringify(newParams, { skipEmptyString: true });

		navigate({ search }, { replace: true });
	};

	const handleClick = (e) => {
		console.log(e);
		if (e.target.className.includes('open')) {
			setIsOpen(false);
		} else setIsOpen(true);
	};

	return (
		<div className={styles['year-wrapper']}>
			<label className={styles['year-label']}>Год выпуска</label>
			<select
				value={selectedYear?.value || ''}
				onChange={handleYearChange}
				className={`${styles['custom-select']} ${isOpen ? styles['open'] : ''}`}
				onClick={handleClick}
			>
				{releaseYears.map(year => (
					<option key={year.value} value={year.value}>
						{year.label}
					</option>
				))}
			</select>
			<span className={`${styles['icon']} ${isOpen ? styles['open'] : ''}`}></span>
		</div>
	);
};

export default ReleaseYearFilter;

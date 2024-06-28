'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Select, { StylesConfig } from 'react-select';
import styles from './styles/GenresFilter.module.css';
import CustomDropdownIndicator from './CustomDropdownIndicator';
import { useDispatch } from 'react-redux';
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

const ReleaseYearFilter: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const initialYearParam = searchParams.get('releaseYear') || '';
	const [selectedYear, setSelectedYear] = useState<OptionType>({ value: initialYearParam, label: initialYearParam || 'Не выбран' });
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	useEffect(() => {
		setSelectedYear({ value: initialYearParam, label: initialYearParam || 'Не выбран' });
	}, [initialYearParam]);

	const handleYearChange = (selectedOption: OptionType | null) => {
		if (selectedOption) {
			setSelectedYear(selectedOption);
			const yearValue = selectedOption.value !== '' ? selectedOption.value : undefined;
			dispatch(setReleaseYear(yearValue));

			const params = new URLSearchParams(searchParams);
			if (yearValue) {
				params.set('releaseYear', yearValue);
			} else {
				params.delete('releaseYear');
			}
			const pathname = `?${params.toString()}`;
			router.push(pathname);
		}
	};

	return (
		<div>
			<label className={styles['genre-label']}>Год выпуска</label>
			<Select
				instanceId={'year'}
				value={selectedYear}
				onChange={handleYearChange}
				options={releaseYears}
				styles={customStyles}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator: (props) => <CustomDropdownIndicator {...props} menuIsOpen={menuIsOpen} />,
				}}
				placeholder="Выберите год"
				onMenuOpen={() => setMenuIsOpen(true)}
				onMenuClose={() => setMenuIsOpen(false)}
			/>
		</div>
	);
};

export default ReleaseYearFilter;
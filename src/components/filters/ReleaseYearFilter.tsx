import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Select, { StylesConfig } from 'react-select';
import styles from './styles/GenresFilter.module.css';
import CustomDropdownIndicator from './CustomDropdownIndicator';
import { setReleaseYear } from '../../slices/filmsSlice';
import {RootState} from "../../store/store";

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
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = queryString.parse(location.search);
	const initialSelectedYear = releaseYears.find(year => year.value === queryParams.releaseYear?.toString()) || null;
	const [selectedYear, setSelectedYear] = useState<OptionType | null>(initialSelectedYear);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (initialSelectedYear) {
			dispatch(setReleaseYear(initialSelectedYear.value));
		}
	}, [initialSelectedYear, dispatch]);

	const handleYearChange = (selectedOption: OptionType | null) => {
		setSelectedYear(selectedOption);
		const yearValue = selectedOption?.value || '';
		dispatch(setReleaseYear(yearValue));

		const newParams = { ...queryString.parse(location.search), releaseYear: yearValue };
		const search = queryString.stringify(newParams, { skipEmptyString: true });

		navigate({ search }, { replace: true });
	};

	return (
		<div>
			<label className={styles['genre-label']}>Год выпуска</label>
			<Select
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

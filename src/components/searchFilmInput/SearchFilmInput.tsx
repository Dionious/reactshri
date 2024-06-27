import React, { useState } from 'react';
import styles from './styles/SearchFilmInput.module.css';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../slices/filmsSlice';
import debounce from 'lodash.debounce'; // Импорт debounce

const SearchFilmInput: React.FC = () => {
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState<string>('');

	// Создание функции-обработчика с использованием debounce
	const handleInputChangeDebounced = debounce((value: string) => {
		dispatch(setTitle(value));
	}, 500); // Установка задержки в 300 мс

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInputValue(newValue);
		handleInputChangeDebounced(newValue); // Вызов debounce-функции при изменении значения
	};

	const handleClearInput = () => {
		setInputValue('');
		dispatch(setTitle(''));
	};

	return (
		<div className={styles['search-form-input-wrapper']}>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Название фильма"
				className={styles['custom-input']}
			/>
			{inputValue && (
				<span className={styles['clear-icon']} onClick={handleClearInput}></span>
			)}
		</div>
	);
};

export default SearchFilmInput;

import React, { useState } from 'react';
import styles from './styles/SearchFilmInput.module.css';

interface CustomInputFieldProps {
	onChange: (value: string | null) => void;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({ onChange }) => {
	const [inputValue, setInputValue] = useState<string>('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInputValue(newValue);
		onChange(newValue); // Передача измененного значения наружу
	};

	const handleClearInput = () => {
		setInputValue('');
		onChange(''); // Очистка внешнего значения
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

export default CustomInputField;

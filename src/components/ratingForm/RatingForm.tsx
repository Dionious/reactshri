import React, { useState } from 'react';
import styles from './styles/RatingForm.module.css';
import debounce from 'lodash.debounce'; // Импортируем debounce из lodash

interface RatingFormProps {
    onRateMovie: (rating: number) => void;
    currentRating: number; // Текущая оценка пользователя или фильма
}

const RatingForm: React.FC<RatingFormProps> = ({ onRateMovie, currentRating }) => {
	const [hoverRating, setHoverRating] = useState<number | null>(null);

	const handleMouseEnter = (rating: number) => {
		setHoverRating(rating);
	};

	const handleMouseLeave = () => {
		setHoverRating(null);
	};

	const debounceRateMovie = debounce((rating: number) => {
		onRateMovie(rating); // Функция с debounce для выставления оценки
	}, 300); // Задержка в миллисекундах (в данном случае 300 мс)

	const handleClick = (rating: number) => {
		debounceRateMovie(rating); // Вызываем debounce-функцию при клике
	};

	return (
		<div className={styles['rating-form']}>
			<div className={styles['stars-wrapper']}>
				{[1, 2, 3, 4, 5].map(rating => (
					<div
						key={rating}
						className={`${styles['star']} ${rating <= currentRating ? styles['filled'] : ''} ${rating <= (hoverRating || 0) ? styles['hovered'] : ''}`}
						onMouseEnter={() => handleMouseEnter(rating)}
						onMouseLeave={handleMouseLeave}
						onClick={() => handleClick(rating)}>
					</div>
				))}
			</div>
			<div className={styles['star-number-wrapper']}>
				{[1, 2, 3, 4, 5].map(rating => (
					<span key={rating} className={styles['star-number']}>{rating}</span>
				))}
			</div>
		</div>
	);
};

export default RatingForm;

import React from 'react';
import styles from './styles/RatingDisplay.module.css';

interface RatingDisplayProps {
    currentRating: number; // Текущая оценка фильма
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ currentRating }) => {
	return (
		<div className={styles['rating-display']}>
			<div className={styles['stars-wrapper']}>
				{[1, 2, 3, 4, 5].map(rating => (
					<div
						key={rating}
						className={`${styles['star']} ${rating <= currentRating ? styles['filled'] : ''}`}
					></div>
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

export default RatingDisplay;

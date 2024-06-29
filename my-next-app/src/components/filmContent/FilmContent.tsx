import React, { useState, useEffect } from 'react';
import styles from './styles/FilmContent.module.css';
import { Movie } from '../../slices/apiSlice';
import { useRateMovieMutation } from '../../slices/apiSlice';
import RatingForm from '../ratingForm/RatingForm';

interface FilmContentProps {
    film: Movie;
}

const FilmContent: React.FC<FilmContentProps> = ({ film }) => {
	const [rateMovie] = useRateMovieMutation();
	const [userRating, setUserRating] = useState<number | null>(null);

	useEffect(() => {
		const storedRating = getLocalMovieRating(film.id);
		if (storedRating) {
			setUserRating(storedRating);
		}
	}, [film.id]);

	const handleRateMovie = async (rating: number) => {
		setUserRating(rating);
		saveLocalMovieRating(film.id, rating);

		const token = localStorage.getItem('token');
		if (token) {
			try {
				await rateMovie({ token, movieId: film.id, user_rate: rating }).unwrap();
			} catch (error) {
				console.error('Error rating movie:', error);
			}
		}
	};

	const getLocalMovieRating = (movieId: string): number | null => {
		const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
		return ratings[movieId] || null;
	};

	const saveLocalMovieRating = (movieId: string, rating: number) => {
		const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
		ratings[movieId] = rating;
		localStorage.setItem('movieRatings', JSON.stringify(ratings));
	};

	return (
		<div className={styles['film-content-wrapper']}>
			<img className={styles['poster']} src={film.poster} alt={`film ${film.title} poster`} />
			<div className={styles['film-content']}>
				<div className={styles['wrapper']}>
					<h2>{film.title}</h2>
					<RatingForm onRateMovie={handleRateMovie} currentRating={Number(film.rating)} />
				</div>
				<p>Жанр: {film.genre}</p>
				<p>Год выпуска: {film.release_year}</p>
				<p>Рейтинг: {film.total_rates_count}</p>
				<p>Описание: {film.description}</p>
				<div className={styles['rating-section']}>
				</div>
			</div>
		</div>
	);
};

export default FilmContent;

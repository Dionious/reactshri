import React, { useState, useEffect } from 'react';
import styles from './styles/FilmContent.module.css';
import { Movie } from '../../slices/apiSlice';
import { useRateMovieMutation } from '../../slices/apiSlice';
import RatingForm from '../ratingForm/RatingForm';
import {useSelector} from 'react-redux';
import {selectAuth} from '../../slices/authSlice';

interface FilmContentProps {
    film: Movie;
}

const FilmContent: React.FC<FilmContentProps> = ({ film }) => {
	const [rateMovie] = useRateMovieMutation();
	const [userRating, setUserRating] = useState<number | null>(null);
	const { isAuthenticated } = useSelector(selectAuth);

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
					{isAuthenticated && <RatingForm onRateMovie={handleRateMovie} currentRating={Number(userRating)} /> }
				</div>
				<div className={styles['film-content-container']}>
					<div className={styles['film-content-element']}>
						<span>Жанр: </span>
						<span> {film.genre}</span>
					</div>
					<div className={styles['film-content-element']}>
						<span>Год выпуска: </span>
						<span>{film.release_year}</span>
					</div>
					<div className={styles['film-content-element']}>
						<span>Рейтинг: </span>
						<span>{film.rating}</span>
					</div>

					<p className={styles['description']}>Описание </p>
					<p>{film.description}</p>
				</div>
				<div className={styles['rating-section']}>
				</div>
			</div>
		</div>
	);
};

export default FilmContent;

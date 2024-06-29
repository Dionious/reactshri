import React from 'react';
import { Film } from '../../slices/apiSlice';
import styles from './styles/FilmCard.module.css';
import { Link } from 'react-router-dom';
import RatingDisplay from '../ratingForm/RatingDisplay';

interface FilmCardProps {
    film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
	return (
		<Link to={`/films/${film.id}`}>
			<div className={styles['film-card-wrapper']}>
				<img className={styles['poster']} src={film.poster} alt={`film ${film.title} poster`} />
				<div className={styles['film-card-main-content']}>
					<h2>{film.title}</h2>
					<div className={styles['film-card-main-content-wrapper']}>
						<div className={styles['film-card-main-content-names']}>
							<p>Жанр: </p>
							<p>Год выпуска:</p>
							<p>Описание: </p>
						</div>
						<div className={styles['film-card-main-content-meanings']}>
							<p>{film.genre}</p>
							<p>{film.release_year}</p>
							<p>{film.description}</p>
						</div>
					</div>
					<RatingDisplay
						currentRating={Number(film.rating)}/> {/* Вставляем RatingDisplay с текущим рейтингом фильма */}
				</div>
			</div>
		</Link>
	);
};

export default FilmCard;

import React from 'react';
import { Film } from '../../api/apiSlice';
import styles from './styles/FilmCard.module.css';

interface FilmCardProps {
    film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
	return (
		<div className={styles['film-card-wrapper']}>
			<img className={styles['poster']} src={film.poster} alt={`film ${film.title} poster`} />
			<div className={styles['film-card-main-content']}>
				<h2>{film.title}</h2>
				<p>Жанр: {film.genre}</p>
				<p>Год выпуска: {film.release_year}</p>
				<p>Описание: {film.description}</p>
			</div>
		</div>
	);
};

export default FilmCard;

import React from 'react';
import styles from './styles/FilmContent.module.css';
import { Movie } from '../../slices/apiSlice'; // Подставьте путь к вашему API слайсу

interface FilmContentProps {
    film: Movie;
}

const FilmContent: React.FC<FilmContentProps> = ({film}) => {
	return (
		<div className={styles['film-content-wrapper']}>
			<img className={styles['poster']} src={film.poster} alt={`film ${film.title} poster`}/>
			<div className={styles['film-content']}>
				<h2>{film.title}</h2>
				<p>Жанр: {film.genre}</p>
				<p>Год выпуска: {film.release_year}</p>
				<p>Рейтинг: {film.total_rates_count}</p>
				<p>Описание: {film.description}</p>
			</div>
		</div>
	);
};

export default FilmContent;

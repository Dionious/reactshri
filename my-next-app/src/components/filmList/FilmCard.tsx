import React from 'react';
import { Film } from '../../slices/apiSlice';
import styles from './styles/FilmCard.module.css';
import Link from 'next/link';
import RatingDisplay from '../ratingForm/RatingDisplay';
import Image from 'next/image';

interface FilmCardProps {
    film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
	return (
		<Link href={`/films/${film.id}`}>
			<div className={styles['film-card-wrapper']}>
				<Image
					className={styles['poster']}
					src={film.poster}
					alt={`film ${film.title} poster`}
					width={200}
					height={300}
					loading="lazy"
				/>
				<div className={styles['film-card-main-content']}>
					<h2>{film.title}</h2>
					<p>Жанр: {film.genre}</p>
					<p>Год выпуска: {film.release_year}</p>
					<p>Описание: {film.description}</p>
					<RatingDisplay currentRating={Number(film.rating)} /> {/* Вставляем RatingDisplay с текущим рейтингом фильма */}
				</div>
			</div>
		</Link>
	);
};

export default FilmCard;

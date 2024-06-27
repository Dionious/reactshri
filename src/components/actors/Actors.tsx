import React, { useState } from 'react';
import styles from './styles/Actors.module.css';
import { Movie } from '../../slices/apiSlice';
import classNames from 'classnames';

interface ActorsProps {
  actors: Movie['actors'];
}

const ActorCarousel: React.FC<ActorsProps> = ({ actors }) => {
	const [startIndex, setStartIndex] = useState(0);
	const itemsPerPage = Math.floor(window.innerWidth / 160);

	const nextSlide = () => {
		if (startIndex + itemsPerPage < actors.length) {
			setStartIndex(startIndex + itemsPerPage);
		}
	};

	const prevSlide = () => {
		if (startIndex - itemsPerPage >= 0) {
			setStartIndex(startIndex - itemsPerPage);
		}
	};

	return (
		<div className={styles.actorsWrapper}>
			<div className={styles.header}>Актёры</div>
			<div className={styles.carousel}>
				<div
					className={styles.slideWrapper}
					style={{ transform: `translateX(-${startIndex * 160}px)` }}
				>
					{actors.map((actor, index) => (
						<div key={index} className={styles.slide}>
							<img src={actor.photo} alt={actor.name} className={styles.actorImage} />
							<div className={styles.actorName}>{actor.name}</div>
						</div>
					))}
				</div>
				<div
					className={classNames(styles.prevButton, {
						[styles.prevButtonDisabled]: startIndex === 0
					})}
					onClick={prevSlide}
				>
				</div>
				{startIndex + itemsPerPage < actors.length && <div
					className={styles.nextButton}
					onClick={nextSlide}
				>
				</div>}
			</div>
		</div>
	);
};

export default ActorCarousel;

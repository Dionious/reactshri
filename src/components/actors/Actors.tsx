import React, { useState } from 'react';
import styles from './styles/Actors.module.css';
import { Movie } from '../../slices/apiSlice';

interface ActorsProps {
  actors: Movie['actors'];
}

const ActorCarousel: React.FC<ActorsProps> = ({ actors }) => {
	const newActors = [...actors, ...actors, ...actors, ...actors];
	const [startIndex, setStartIndex] = useState(0);
	const itemsPerPage = Math.floor(window.innerWidth / 160);

	const nextSlide = () => {
		if (startIndex + itemsPerPage < newActors.length) {
			setStartIndex(startIndex + itemsPerPage);
		}
	};

	const prevSlide = () => {
		if (startIndex - itemsPerPage >= 0) {
			setStartIndex(startIndex - itemsPerPage);
		}
	};

	return (
		<div className={styles.carousel}>
			<div 
				className={styles.slideWrapper} 
				style={{ transform: `translateX(-${startIndex * 160}px)` }}
			>
				{newActors.map((actor, index) => (
					<div key={index} className={styles.slide}>
						<img src={actor.photo} alt={actor.name} className={styles.actorImage} />
						<div className={styles.actorName}>{actor.name}</div>
					</div>
				))}
			</div>
			<button 
				className={styles.prevButton} 
				onClick={prevSlide} 
				disabled={startIndex === 0}
			>
				Prev
			</button>
			<button 
				className={styles.nextButton} 
				onClick={nextSlide} 
				disabled={startIndex + itemsPerPage >= newActors.length}
			>
				Next
			</button>
		</div>
	);
};

export default ActorCarousel;

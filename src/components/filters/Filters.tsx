import styles from './styles/Filters.module.css';
import GenresFilter from './GenresFilter';
import ReleaseYearFilter from './ReleaseYearFilter';

function Filters() {
	return (
		<section className={styles['filters']}>
			<header className={styles['filters__header']}>Фильтр</header>
			<div className={styles['filters__wrapper']}>
				<GenresFilter/>
				<ReleaseYearFilter/>
			</div>
		</section>
	);
}

export default Filters;

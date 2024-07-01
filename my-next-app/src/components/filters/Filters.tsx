import styles from './styles/Filters.module.css';
import FiltersProvider from '@/components/filters/FiltersProvider';

function Filters() {

	return (
		<section className={styles['filters']}>
			<header className={styles['filters__header']}>Фильтр</header>
			<div className={styles['filters__wrapper']}>
				<FiltersProvider/>
			</div>
		</section>
	);
}

export default Filters;

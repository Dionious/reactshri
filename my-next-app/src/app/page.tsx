import Filters from '../components/filters/Filters';
import FilmListProvider from '../components/filmList/FilmListProvider';
import styles from './page.module.css';

export default function Films() {

	return (
		<>
			<div className={styles['content-wrapper']}>
				<Filters/>
				<div style={{width: '100%'}} className={'films-wrapper'}>
					<FilmListProvider/>
				</div>
			</div>
		</>
	)
	;
}

'use client';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setGenre, setReleaseYear } from '@/slices/filmsSlice';
import Filters from '../../../components/filters/Filters';
import FilmListProvider from '../../../components/filmList/FilmListProvider';
import styles from '../../page.module.css';

const FilmPage = ({ params }) => {
	const dispatch = useDispatch();
	const { genre, year } = params;

	useEffect(() => {
		if (genre) {
			dispatch(setGenre(genre));
		}
		if (year) {
			dispatch(setReleaseYear(year));
		}
	}, [genre, year, dispatch]);

	return (
		<>
			<div className={styles['content-wrapper']}>
				<Filters/>
				<div style={{width: '100%'}} className={'films-wrapper'}>
					<FilmListProvider/>
				</div>
			</div>
		</>
	);
};

export default FilmPage;

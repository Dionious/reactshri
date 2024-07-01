'use client';
import FilmList from '@/components/filmList/FilmList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setGenre } from '@/slices/filmsSlice';
import Filters from '../../components/filters/Filters';
import FilmListProvider from '../../components/filmList/FilmListProvider';
import styles from '../page.module.css';

const FilmPage = ({ params }) => {
	const dispatch = useDispatch();
	const { genre } = params;

	useEffect(() => {
		if (genre) {
			dispatch(setGenre(genre));
		}
	}, [genre, dispatch]);

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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setPage, fetchFilms } from '../../api/filmsSlice';
import FilmCard from './FilmCard';
import styles from './styles/FilmList.module.css';
import Pagination from "./Pagination";

const FilmList: React.FC = () => {
	const dispatch = useDispatch();
	const films = useSelector((state: RootState) => state.films.films);
	const loading = useSelector((state: RootState) => state.films.loading);
	const error = useSelector((state: RootState) => state.films.error);
	const currentPage = useSelector((state: RootState) => state.films.currentPage);
	const totalPages = useSelector((state: RootState) => state.films.totalPages);

	useEffect(() => {
		dispatch(fetchFilms('')); // Вы можете передать параметры запроса здесь
	}, [dispatch]);

	const handlePageChange = (newPage: number) => {
		console.log('here2');
		console.log(newPage);
		dispatch(setPage(newPage));
		dispatch(fetchFilms(newPage));
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className={styles['film-list-wrapper']}>
			{films.map((film) => (
				<FilmCard key={film.id} film={film} />
			))}
			<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}></Pagination>
		</div>
	);
};

export default FilmList;

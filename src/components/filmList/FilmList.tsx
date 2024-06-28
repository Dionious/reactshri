import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setPage, setTotalPages } from '../../slices/filmsSlice';
import { useFetchFilmsQuery } from '../../slices/apiSlice';
import FilmCard from './FilmCard';
import styles from './styles/FilmList.module.css';
import Pagination from './Pagination';
import Loader from '../loader/Loader';

const FilmList: React.FC = () => {
	const dispatch = useDispatch();
	const currentPage = useSelector((state: RootState) => state.films.currentPage);
	const title = useSelector((state: RootState) => state.films.title);
	const genre = useSelector((state: RootState) => state.films.genre);
	const releaseYear = useSelector((state: RootState) => state.films.releaseYear);
	const { data, error, isFetching } = useFetchFilmsQuery({ page: currentPage, title, genre, releaseYear });

	useEffect(() => {
		if (data) {
			dispatch(setTotalPages(data.total_pages));
		}
	}, [data, dispatch]);

	const handlePageChange = (newPage: number) => {
		dispatch(setPage(newPage));
	};

	if (isFetching) {
		return (
			<Loader/>
		);
	}

	if (data?.search_result.length === 0 ) {
		return (
			<div className={styles['no-films-container']}>
				<div className={styles['not-found']}>Фильмы не найдены</div>
				<div className={styles['repeat']}>Измените запрос и попробуйте снова</div>
			</div>);
	}

	return (
		<div className={styles['film-list-wrapper']}>
			{data?.search_result.map((film) => (
				<FilmCard key={film.id} film={film} />
			))}
			<Pagination currentPage={currentPage} totalPages={data?.total_pages || 1} onPageChange={handlePageChange} />
		</div>
	);
};

export default FilmList;

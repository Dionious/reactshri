import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetFilmByIdQuery } from '../slices/apiSlice';
import FilmContent from '../components/filmContent/FilmContent';
import Actors from "../components/actors/Actors"; // Подставьте путь к вашему API слайсу

const FilmPage: React.FC = () => {
	const { id } = useParams<{ id: string }>(); // Получаем параметр ID из URL
	const { data: film, isLoading, isError } = useGetFilmByIdQuery(id); // Выполняем запрос к API
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {isError.message}</div>;
	}

	if (!film) {
		return <div>Film not found</div>;
	}

	return (
		<>
			<FilmContent film={film}></FilmContent>
			<Actors actors={film.actors}></Actors>
		</>
	);
};

export default FilmPage;

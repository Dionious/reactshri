'use client';
import React from 'react';
import { useGetFilmByIdQuery } from '../../../slices/apiSlice';
import FilmContent from '../../../components/filmContent/FilmContent';
import Actors from '../../../components/actors/Actors';
import Loader from '../../../components/loader/Loader';

interface FilmPageProps {
    params: { id: string };
}

const FilmPage: React.FC<FilmPageProps> = ({ params }) => {
	const { id } = params;
	const { data: film, isLoading, isError } = useGetFilmByIdQuery(id);

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return <div>Error: {isError.message}</div>;
	}

	if (!film) {
		return <div>Film not found</div>;
	}

	return (
		<>
			<FilmContent film={film} />
			<Actors actors={film.actors} />
		</>
	);
};

export default FilmPage;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Film {
	description: string;
	genre: string;
	id: string;
	poster: string;
	rating: string;
	release_year: number;
	title: string;
}

interface SearchResponse {
	search_result: Film[];
	total_pages: number;
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' }),
	endpoints: (builder) => ({
		fetchFilms: builder.query<SearchResponse, { page: number; title: string; genre: string; releaseYear: string }>({
			query: ({ page, title, genre, releaseYear }) => {
				let queryString = `search?page=${page}`;
				if (title) queryString += `&title=${title}`;
				if (genre) queryString += `&genre=${genre}`;
				if (releaseYear) queryString += `&release_year=${releaseYear}`;
				return queryString;
			},
		}),
	}),
});

export const { useFetchFilmsQuery } = apiSlice;
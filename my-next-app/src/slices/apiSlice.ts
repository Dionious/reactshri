import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

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

type Actor = {
	name: string;
	photo: string;
};

export interface Movie extends Film {
	actors: Array<Actor>;
	total_rates_count: string;
}

const customFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' });
	try {
		const result = await baseQuery(args, api, extraOptions);
		if (result.error) {
			console.error('Error from baseQuery:', result.error);
		}
		return result;
	} catch (error) {
		console.error('Error:', error);
		return { error: { status: 'FETCH_ERROR', data: error } as FetchBaseQueryError };
	}
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: customFetchBaseQuery,
	tagTypes: ['Movie'],
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
		getFilmById: builder.query<Movie, string>({
			query: (id) => `movie/${id}`,
			providesTags: (result, error, id) => [{ type: 'Movie', id }],
		}),
		rateMovie: builder.mutation<void, { token: string; movieId: string; user_rate: number }>({
			query: ({ token, movieId, user_rate }) => ({
				url: 'rateMovie',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ movieId, user_rate }),
			}),
			invalidatesTags: (result, error, { movieId }) => [{ type: 'Movie', id: movieId }],
		}),
	}),
});

export const { useFetchFilmsQuery, useGetFilmByIdQuery, useRateMovieMutation } = apiSlice;

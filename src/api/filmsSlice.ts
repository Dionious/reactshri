import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Film {
	description: string;
	genre: string;
	id: string;
	poster: string;
	rating: string;
	release_year: number;
	title: string;
}

interface FilmsState {
    films: Film[];
    loading: boolean;
    error: string | null;
	currentPage: number;
	totalPages: number;
}

const initialState: FilmsState = {
	films: [],
	loading: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
};

export const fetchFilms = createAsyncThunk('films/fetchFilms', async (page: number = 1) => {
	try {
		let url = 'http://localhost:3030/api/v1/search';
		const params = {
			params: {},
		};
		if (page) {
			url +=`?title=&page=${page}`;
		}
		console.log(url)
		const response = await axios.get(url);

		if (response.status !== 200) {
			throw new Error(`Unexpected status code: ${response.status}`);
		}
		console.log(response.data)
		return {
			films: response.data.search_result as Film[],
			totalPages: response.data.total_pages,
		};
	} catch (error) {
		console.error('Error fetching films:', error);
		throw Error(error.message);
	}
});

const filmsSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilms.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFilms.fulfilled, (state, action) => {
				state.loading = false;
				state.films = action.payload.films;
				state.totalPages = action.payload.totalPages;
			})
			.addCase(fetchFilms.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch films';
			});
	},
});

export const { setPage } = filmsSlice.actions;
export default filmsSlice.reducer;
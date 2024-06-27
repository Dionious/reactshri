import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilmsState {
	currentPage: number;
	totalPages: number;
	title: string;
	genre: string;
	releaseYear: string;
}

const initialState: FilmsState = {
	currentPage: 1,
	totalPages: 1,
	title: '',
	genre: '',
	releaseYear: '',
};

const filmsSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setTotalPages: (state, action: PayloadAction<number>) => {
			state.totalPages = action.payload;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		setGenre: (state, action: PayloadAction<string>) => {
			state.genre = action.payload;
		},
		setReleaseYear: (state, action: PayloadAction<string>) => {
			state.releaseYear = action.payload;
		},
	},
});

export const { setPage, setTotalPages, setTitle, setGenre, setReleaseYear  } = filmsSlice.actions;
export default filmsSlice.reducer;
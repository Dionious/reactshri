import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from '../api/filmsSlice';

const store = configureStore({
	reducer: {
		films: filmsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

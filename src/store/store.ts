import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from '../slices/filmsSlice';
import { apiSlice } from '../slices/apiSlice';

const store = configureStore({
	reducer: {
		films: filmsReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
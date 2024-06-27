import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from '../slices/filmsSlice';
import { apiSlice } from '../slices/apiSlice';
import authReducer, { initializeAuth } from '../slices/authSlice';

const store = configureStore({
	reducer: {
		films: filmsReducer,
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

const token = localStorage.getItem('token');
if (token) {
	store.dispatch(initializeAuth({ token }));
}

export type RootState = ReturnType<typeof store.getState>;
export default store;
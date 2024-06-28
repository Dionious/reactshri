'use client';
import SearchFilmInput from '../searchFilmInput/SearchFilmInput';
import FilmList from './FilmList';
import {Provider} from 'react-redux';
import store from '@/store/store';

export default function Films() {
	return (
		<Provider store={store}>
			<SearchFilmInput/>
			<FilmList></FilmList>
		</Provider>
	)
	; 
}

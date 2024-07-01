'use client';
import React from 'react';
import GenresFilter from './GenresFilter';
import ReleaseYearFilter from './ReleaseYearFilter';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { useSearchParams } from 'next/navigation';

interface FiltersProviderProps {
    initialGenre?: string;
}

const FiltersProvider: React.FC<FiltersProviderProps> = () => {

	return (
		<Provider store={store}>
			<GenresFilter/>
			<ReleaseYearFilter />
		</Provider>
	);
};

export default FiltersProvider;

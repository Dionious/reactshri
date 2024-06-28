'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Header from './Header';

const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Provider store={store}>
			<Header />
			{children}
		</Provider>
	);
};

export default ProviderWrapper;

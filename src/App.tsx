import './App.css';
import Header from './components/header/Header';
import Filters from './components/filters/Filters';
import SearchFilmInput from './components/searchFilmInput/SearchFilmInput';
import store from './store/store';
import { Provider } from 'react-redux';
import FilmList from './components/filmList/FilmList';

function App() {
	return (
		<Provider store={store}>
			<Header/>
			<div className={'content-wrapper'}>
				<Filters />
				<div className={'films-wrapper'}>
					<SearchFilmInput onChange={() => console.log('here')} />
					<FilmList></FilmList>
				</div>
			</div>
		</Provider>
	);
}

export default App;

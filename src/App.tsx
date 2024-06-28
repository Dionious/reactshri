import './App.css';
import Header from './components/header/Header';
import Filters from './components/filters/Filters';
import SearchFilmInput from './components/searchFilmInput/SearchFilmInput';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmsListPage from './pages/FilmsListPage'; // Assuming this is your FilmsListPage component
import FilmPage from './pages/FilmPage'; // Assuming this is your FilmPage component

function App() {
	return (
		<Provider store={store}>
			<Header/>
			<div style={{ padding: '20px', paddingRight: '70px' }}>
				<Router>
					<Routes>
						<Route path="/" element={<FilmsListPage />} />
						<Route path="/films/:id" element={<FilmPage />} />
					</Routes>
				</Router>
			</div>
		</Provider>
	);
}

export default App;

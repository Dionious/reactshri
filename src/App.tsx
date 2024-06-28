import './App.css';
import Header from './components/header/Header';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmsListPage from './pages/FilmsListPage';
import FilmPage from './pages/FilmPage';

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

import Filters from '../components/filters/Filters';
import SearchFilmInput from '../components/searchFilmInput/SearchFilmInput';
import FilmList from '../components/filmList/FilmList';

function FilmsListPage() {
	return (
		<div className={'content-wrapper'}>
			<Filters />
			<div className={'films-wrapper'}>
				<SearchFilmInput />
				<FilmList></FilmList>
			</div>
		</div>
	);
}

export default FilmsListPage;

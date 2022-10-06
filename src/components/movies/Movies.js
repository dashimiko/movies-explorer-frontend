import SearchForm from '../../components/searchForm/SearchForm';
import MoviesCardList from '../../components/moviesCardList/MoviesCardList';

export default function Movies({ savedCardListMovies, onMovieLike, onMovieDelete, handleSearchSubmit, handleShortFilms, shortMovies, notFound, filteredMovies, searchError, isLoader}) {

 return (
	<>
    <SearchForm handleSearchSubmit={handleSearchSubmit}
    handleShortFilms={handleShortFilms}
    shortMovies={shortMovies}
    notFound={notFound}/>

    <MoviesCardList cardListMovies={filteredMovies}
    savedCardListMovies={savedCardListMovies}
    onMovieLike={onMovieLike}
    onMovieDelete={onMovieDelete}
    notFound={notFound}
    searchError={searchError}
    isLoader={isLoader}/>
  </>
 )
};

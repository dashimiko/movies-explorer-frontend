import {useState, useEffect} from 'react';
import SearchForm from '../searchForm/SearchForm';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import {filterShortMovies, filterSearchRequest} from '../../utils/utils';

function SavedMovies({onMovieDelete, savedCardListMovies}) {

  const [cardListMovies, setСardListMovies] = useState(savedCardListMovies);
  const [shortMovies, setShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setСardListMovies(savedCardListMovies);
    if (savedCardListMovies.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [savedCardListMovies]);

  const handleSavedSearchSubmit = (inputValue) => {
    if (shortMovies) {
      const moviesList = filterSearchRequest(savedCardListMovies, inputValue);
      setСardListMovies(filterShortMovies(moviesList))
      filterShortMovies(moviesList).length === 0 ? setNotFound(true) : setNotFound(false);
    } else {
      const moviesList = filterSearchRequest(savedCardListMovies, inputValue);
      setСardListMovies(moviesList);
      moviesList.length === 0 ? setNotFound(true) : setNotFound(false);
    }
  }

  function renderShortFilms (inputValue) {
    const moviesList = filterSearchRequest(savedCardListMovies, inputValue)
    if (!shortMovies) {
      setShortMovies(true);
      setСardListMovies(filterShortMovies(moviesList));
      filterShortMovies(moviesList).length === 0 ? setNotFound(true) : setNotFound(false);
    } else {
      setShortMovies(false);
      setСardListMovies(moviesList)
      moviesList.length === 0 ? setNotFound(true) : setNotFound(false);
    }
  }

  const handleSavedShortFilms = (inputValue) => {
    setTimeout(renderShortFilms, 100, inputValue);
  }

  return (
    <>
    <SearchForm handleSearchSubmit={handleSavedSearchSubmit}
    handleShortFilms={handleSavedShortFilms}
    shortMovies={shortMovies}/>

    <MoviesCardList cardListMovies={cardListMovies}
    savedCardListMovies={savedCardListMovies}
    onMovieDelete={onMovieDelete}
    notFound={notFound}/>
   </>
	);
}

export default SavedMovies;

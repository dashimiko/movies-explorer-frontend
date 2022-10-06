import {useState, useContext, useEffect} from 'react';
import SearchForm from '../searchForm/SearchForm';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {filterShortMovies, filterSearchRequest} from '../../utils/utils';

function SavedMovies({onMovieDelete, savedCardListMovies}) {

  const currentUser = useContext(CurrentUserContext);
  const [cardListMovies, setСardListMovies] = useState(savedCardListMovies);
  const [filteredMovies, setFilteredMovies] = useState(cardListMovies);
  const [shortMovies, setShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function handleSavedSearchSubmit(inputValue) {
    const moviesList = filterSearchRequest(savedCardListMovies, inputValue);
    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setFilteredMovies(moviesList);
      setСardListMovies(moviesList);
      setNotFound(false);
    }
  }

  function handleSavedShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      setСardListMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
      localStorage.setItem(`${currentUser._id} shortSavedMovies`, true);
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser._id} shortSavedMovies`, false);
      if (filteredMovies.length !== 0) {
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setСardListMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser._id} shortSavedMovies`) === 'true') {
      setShortMovies(true);
      setСardListMovies(filterShortMovies(savedCardListMovies));
    } else {
      setShortMovies(false);
      setСardListMovies(savedCardListMovies);
    }
  }, [savedCardListMovies, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedCardListMovies);
    if (savedCardListMovies.length !== 0) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [savedCardListMovies]);

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

import {useState,useEffect,useContext} from 'react';
import {filterShortMovies,filterSearchRequest} from '../../utils/utils';
import SearchForm from '../../components/searchForm/SearchForm';
import MoviesCardList from '../../components/moviesCardList/MoviesCardList';
import {moviesApi} from '../../utils/MoviesApi'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function Movies({ savedCardListMovies, onMovieLike, onMovieDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [startMovies, setStartMovies] = useState([]);

  function adaptMovieImage(movies) {
    movies.forEach(movie => {
      movie.thumbnail = movie.thumbnail ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` : 'https://nic-pnb.ru/wp-content/uploads/2014/09/no-foto-2.jpg';
      movie.image = movie.image ? `https://api.nomoreparties.co${movie.image.url}` : 'https://nic-pnb.ru/wp-content/uploads/2014/09/no-foto-2.jpg';
    });
    return movies;
  }

  function handleSetFilteredMovies(movies, search, shortMovies) {
    if (shortMovies) {
      const moviesList = filterSearchRequest(movies, search);
      setFilteredMovies(filterShortMovies(moviesList))
      filterShortMovies(moviesList).length === 0 ? setNotFound(true) : setNotFound(false);
      localStorage.setItem(`${currentUser._id} movies`, JSON.stringify(moviesList));
      localStorage.setItem(`${currentUser._id} allmovies`, JSON.stringify(movies));
    } else {
      const moviesList = filterSearchRequest(movies, search);
      setFilteredMovies(moviesList);
      moviesList.length === 0 ? setNotFound(true) : setNotFound(false);
      localStorage.setItem(`${currentUser._id} movies`, JSON.stringify(moviesList));
      localStorage.setItem(`${currentUser._id} allmovies`, JSON.stringify(movies));
    }
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser._id} shortMovies`, shortMovies);
    localStorage.setItem(`${currentUser._id} movieSearch`, inputValue);
    if (startMovies.length === 0) {
      setIsLoader(true);
      moviesApi.getMovies().then(movies => {
        setStartMovies(movies);
        setIsAllMovies(movies);
        handleSetFilteredMovies(adaptMovieImage(movies),inputValue,shortMovies);
      }).catch(() => setSearchError(true))
      .finally(() => setIsLoader(false));
    } else {
      handleSetFilteredMovies(startMovies, inputValue,shortMovies);
    }
    }

  function renderShortFilms (inputValue) {
    const moviesList = filterSearchRequest(isAllMovies, inputValue)
    localStorage.setItem(`${currentUser._id} allmovies`, JSON.stringify(isAllMovies));
    localStorage.setItem(`${currentUser._id} movieSearch`, inputValue);
    if (!shortMovies) {
      setShortMovies(true);
      setFilteredMovies(filterShortMovies(moviesList));
      filterShortMovies(moviesList).length === 0 ? setNotFound(true) : setNotFound(false);
      localStorage.setItem(`${currentUser._id} movies`, JSON.stringify(moviesList));
    } else {
      setShortMovies(false);
      setFilteredMovies(moviesList);
      moviesList.length === 0 ? setNotFound(true) : setNotFound(false);
      localStorage.setItem(`${currentUser._id} movies`, JSON.stringify(moviesList));
    }
  }

  const handleShortFilms = (inputValue) => {
    setTimeout(renderShortFilms, 100, inputValue);
    localStorage.setItem(`${currentUser._id} shortMovies`, !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser._id} shortMovies`) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!localStorage.getItem(`${currentUser._id} movies`)) {
      setFilteredMovies([]);
    } else {
      const movies = JSON.parse(localStorage.getItem(`${currentUser._id} movies`));
      const allmovies = JSON.parse(localStorage.getItem(`${currentUser._id} allmovies`));
      if (localStorage.getItem(`${currentUser._id} shortMovies`) === 'true') {
        setFilteredMovies(filterShortMovies(movies));
        setIsAllMovies(allmovies);
      } else {
        setFilteredMovies(movies);
        setIsAllMovies(allmovies);
      }
    }
  }, [currentUser]);

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

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth.js';
import MoviesCard from '../moviesCard/MoviesCard';
import Preloader from '../../components/preloader/Preloader'

function MoviesCardList({cardListMovies, savedCardListMovies, onMovieLike, onMovieDelete, notFound, searchError, isLoader}) {

  const location = useLocation();
  const [renderedMovies, setRenderedMovies] = useState([]);
  const screenWidth = useWindowWidth();
  const [cardsParams, setCardsParams] = useState({totalCount: 12, moreFilms: 3});
  const moreMovies = renderedMovies.length < cardListMovies.length && location.pathname === '/movies';

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (screenWidth.width > 957 && screenWidth.width > 568) {
        setCardsParams({totalCount: 12, moreFilms: 3});
      } else if (screenWidth.width <= 957 && screenWidth.width > 568) {
        setCardsParams({totalCount: 8, moreFilms: 2});
      } else {
        setCardsParams({totalCount: 5, moreFilms: 2});
      }
    }
  }, [screenWidth, location.pathname]);

  useEffect(() => {
    if (cardListMovies.length) {
      setRenderedMovies(cardListMovies.slice(0, cardsParams.totalCount));
    }
  }, [cardListMovies, cardsParams.totalCount])

  function giveMoreMovies() {
    setCardsParams({totalCount: (cardsParams.totalCount + cardsParams.moreFilms), moreFilms: cardsParams.moreFilms});
  };

  function compareMovie(movie) {
    return savedCardListMovies.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }

  return (
    <>
    {notFound ? (
      <div className="movies section">
        <p className="movies__notfound">Ничего не найдено</p>
      </div>)
      :
    searchError ? (
      <div className="movies section">
        <p className="movies__notfound">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
      </div>)
      :
    isLoader ?
      <Preloader/>
      :
    <div className="movies section">
      <ul className="movies__list">
        {renderedMovies.map(movie => (
          <MoviesCard movie={movie}
          key={movie.id || movie._id}
          liked={compareMovie(movie)}
          onMovieLike={onMovieLike} onMovieDelete={onMovieDelete}
          />
        ))}
      </ul>
      {moreMovies && (
        <div className="movies__pagination-box">
          <button className="button movies__pagination" onClick={giveMoreMovies}>Ещё</button>
        </div>)}
    </div>}
    </>
  )
}

export default MoviesCardList;

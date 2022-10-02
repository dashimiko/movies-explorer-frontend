import SearchForm from '../searchForm/SearchForm';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import { useState } from 'react';
import {moviesApi} from '../../utils/MoviesApi';
import {filterSearchRequest,filterShortMovies} from '../../utils/constants';

function Movies() {

  const [movies, setMovies] = useState([]);//массив фильмов
  const [moreMovies, setMoreMovies] = useState(false);//кнопка "еще"
  const [shortMovies, setShortMovies] = useState(false);//короткометражки включены или нет
  const [notFound, setNotFound] = useState(true);//состояние movieslist с результатом поиска или 404

  const isRequestSaved = () => {
    const request = localStorage.getItem('movieSearch');
    console.log(request);
    if (request) {
      return request;
    } return '';
  };//проверяет сохранился ли поисковой запрос

  const [movieSearch, setMovieSearch] = useState(isRequestSaved())//запрос храним тут

  //контролирует кнопку "ещё"
  function giveMoreFilms(searchMovieList){
    if (searchMovieList.length <= 3){
      setMoreMovies(false);
    } else {
      setMoreMovies(true);
    }
  }

  //поиск по сабмиту
  function handleSearchSubmit(inputValue) {
    moviesApi.getMovies().then(movies => {//получает фильмы от апи
      const searchvalue = filterSearchRequest(inputValue, movies, shortMovies);
      setMovies(searchvalue);//отображает результаты поиска
      giveMoreFilms(searchvalue);//решает, нужно ли добавлять кнопку "еще";
      localStorage.setItem('movieSearch', inputValue);//сохраняет поисковой запрос в локальное хранилище
      setMovieSearch(inputValue);
      if (searchvalue.length === 0) {//если массив пустой, сообщает: ничего не найдено
        setNotFound(false)
      } else {
        setNotFound(true)
      }
    }).catch((err) => console.log(err))
  }

  //cостояние чекбокса: тут фильтрация короткометражек если результаты поиска уже есть, но пользователь тыкает
  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      const newMovieValue = filterShortMovies(movies);//фильтруем список фильмов по длительности
      setMovies(newMovieValue);//перезаписываем значение
      if (newMovieValue.length === 0) {
        setNotFound(false)//некорректно работает
      } else {
        setNotFound(true)
      }
    } else {
      //вернуть изначальный список фильмов
      console.log('dfvdfv')
    }
  }

  return (
		<>
			<SearchForm handleSearchSubmit={handleSearchSubmit} handleShortFilms={handleShortFilms} movieSearch={movieSearch} shortMovies={shortMovies}/>
			<MoviesCardList movies={movies} moreMovies={moreMovies} notFound={notFound}/>
		</>
	);
}

export default Movies;

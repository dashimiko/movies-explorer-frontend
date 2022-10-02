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
  const [initialMovies, setInitialMovies] = useState([]);//первоначальный список фильмов

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

  //если массив с фильмамы пустой, сообщает: ничего не найдено
  function isNotFound(value){
    if (value.length === 0) {
      setNotFound(false)
    } else {
      setNotFound(true)
    }
  }

  //поиск по сабмиту
  function handleSearchSubmit(inputValue) {
    moviesApi.getMovies().then(movies => {//получает фильмы от апи
      const filteredvalue = filterSearchRequest(inputValue, movies, shortMovies);//фильтрует
      setMovies(filteredvalue);//отображает результаты фильтрации
      setInitialMovies(filteredvalue)//сохраняет в переменную все найденные фильмы
      giveMoreFilms(filteredvalue);//решает, нужно ли добавлять кнопку "еще";
      localStorage.setItem('movieSearch', inputValue);//сохраняет поисковой запрос в локальное хранилище
      setMovieSearch(inputValue);
      isNotFound(filteredvalue);//проверят, нужна ли подпись об отсуствии результатов поиска
    }).catch((err) => console.log(err))
  }

  //cостояние чекбокса: тут фильтрация короткометражек если результаты поиска уже есть, но пользователь тыкает
  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      const newMovieValue = filterShortMovies(initialMovies);//фильтруем список фильмов по длительности
      setMovies(newMovieValue);//перезаписываем значение
      isNotFound(newMovieValue);//проверяет нужно ли показывать результаты поиска
    } else {
      //вернуть изначальный список фильмов
      setMovies(initialMovies);
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

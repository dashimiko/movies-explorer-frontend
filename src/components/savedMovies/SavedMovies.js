import SearchForm from '../searchForm/SearchForm';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import { useState } from 'react';
import {moviesApi} from '../../utils/MoviesApi';

function SavedMovies() {

  const [movies, setMovies] = useState([]);//массив фильмов
  const [moreMovies, setMoreMovies] = useState(false);//кнопка "еще"
  const [shortMovies, setShortMovies] = useState(false);//короткометражки

  //поиск по сабмиту
  function handleSearchSubmit(inputValue) {
    moviesApi.getMovies().then(movies => {//получаем фильмы от апи
      const key = inputValue.toLowerCase().trim();//берем ключ из валью инпута
      //преобразовываем свалку названий фильмов: нижний регистр, без пробелов + поиск по массиву через indexOf
      const searchMovieList = movies.filter(o => o.nameRU.toLowerCase().trim().indexOf(key) !== -1 || o.nameEN.toLowerCase().trim().indexOf(key) !== -1);
      setMovies(searchMovieList);//отображаем результаты поиска
      if (searchMovieList.length <= 3){
        setMoreMovies(false);//контролируем кнопку еще
      } else {
      setMoreMovies(true);
    }}).catch((err) => console.log(err))
  }

  //cостояние чекбокса: тут будет фильтрация по duration
  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      console.log('ууу')
    } else {
      console.log('ккккк')
    }
  }

  return (
		<>
			<SearchForm handleSearchSubmit={handleSearchSubmit} handleShortFilms={handleShortFilms} movieSearch={""} shortMovies={shortMovies}/>
			<MoviesCardList movies={movies} moreMovies={moreMovies}/>
		</>
	);
}

export default SavedMovies;

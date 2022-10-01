import SearchForm from '../searchForm/SearchForm';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import { useState } from 'react';
import {moviesApi} from '../../utils/MoviesApi';
import {filterSearchRequest} from '../../utils/constants';

function Movies() {

  const [movies, setMovies] = useState([]);//массив фильмов
  const [moreMovies, setMoreMovies] = useState(false);//кнопка "еще"
  const [shortMovies, setShortMovies] = useState(false);//короткометражки
  const [notFound, setNotFound] = useState(true);//состояние movieslist без ничего или с 404 результатом поиска

  //контролируем кнопку "ещё"
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
      giveMoreFilms(searchvalue);//решает, нужно ли добавлять кнопку "еще"

      if (searchvalue.length === 0) {//если массив пустой, сообщает: ничего не найдено
        setNotFound(false)
      } else {
        setNotFound(true)
      }
    }).catch((err) => console.log(err))
  }

  console.log(notFound);

  //cостояние чекбокса: тут будет фильтрация короткометражек если результаты поиска уже есть, но пользователь тыкает
  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      console.log('здравствуйте')
    } else {
      console.log('до свидания')
    }
  }

  return (
		<>
			<SearchForm handleSearchSubmit={handleSearchSubmit} handleShortFilms={handleShortFilms} movieSearch={''} shortMovies={shortMovies}/>
			<MoviesCardList movies={movies} moreMovies={moreMovies} notFound={notFound}/>
		</>
	);
}

export default Movies;

import {Route, Switch, useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Main from '../main/Main';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SearchForm from '../searchForm/SearchForm';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import Profile from '../profile/Profile';
import Register from '../register/Register';
import Login from '../login/Login';
import NotFound from '../notFound/NotFound';
import InfoToolTip from '../infoToolTip/InfoToolTip';

import {moviesApi} from '../../utils/MoviesApi';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import {mainApi} from '../../utils/MainApi';
import * as Auth from '../../utils/auth';

function App() {

  const [movies, setMovies] = useState([]);
  const [moreMovies, setMoreMovies] = useState(false);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState('');

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isEntranceCompleted, setisEntranceCompleted] = useState(false);
  const [InfoTooltipText, setInfoTooltipText] = useState('');

  // получение информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getProfile()
        .then(res => console.log(res))
        .catch(err =>
          console.log(err)
      )
    }
  }, [loggedIn]);

  /*useEffect(() => {
    moviesApi.getMovies().then((movies) => {
      setMovies(movies)
    }).catch((err) => console.log(err))
}, [])*/

  function onBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  function closePopup() {
    setIsInfoTooltipPopupOpen(false);
  }

  function historyReturn() {
    history.goBack();
  }

  function handleShortFilms() {
    console.log('ghghgh')
  }

  function handleSearchSubmit(inputValue) {
    moviesApi.getMovies().then(movies => {
      const key = inputValue.toLowerCase().trim();
      const searchMovieList = movies.filter(o => o.nameRU.toLowerCase().trim().indexOf(key) !== -1 || o.nameEN.toLowerCase().trim().indexOf(key) !== -1);
      setMovies(searchMovieList);
      if (searchMovieList.length >= 3) {
        setMoreMovies(true)
      }
    }).catch((err) => console.log(err))
  }

  function handleInfoTooltipPopupClick() {
    setIsInfoTooltipPopupOpen(true);
  }

  const handleSubmitRegister = (name, email, password) => {
    Auth.register(name, email, password).then((res) => {
      if (res) {
        handleInfoTooltipPopupClick();
        setisEntranceCompleted(true);
        setInfoTooltipText('Вы успешно зарегистрировались!');
      }
    }).catch(() => {
      handleInfoTooltipPopupClick();
      setisEntranceCompleted(false);
      setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
    });
  };

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Main/>
        </Route>
        <ProtectedRoute path='/movies' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
            <SearchForm  handleSearchSubmit={handleSearchSubmit}  handleShortFilms={handleShortFilms}/>
            <MoviesCardList movies={movies} moreMovies={moreMovies}/>
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
            <SearchForm />
            <MoviesCardList movies={movies} moreMovies={moreMovies}/>
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute path='/profile' loggedIn={loggedIn}>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
          <Profile/>
        </ProtectedRoute>
        <Route path='/signup'>
          <Register handleSubmitRegister={handleSubmitRegister}/>
        </Route>
        <Route path='/signin'>
          <Login/>
        </Route>
        <Route path='*'>
          <NotFound historyReturn={historyReturn}/>
        </Route>
      </Switch>
      <InfoToolTip onClose={closePopup} isOpen={isInfoTooltipPopupOpen} isEntrance={isEntranceCompleted} text={InfoTooltipText}/>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;

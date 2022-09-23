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

function App() {

  const [movies, setMovies] = useState([]);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(true);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    moviesApi.getMovies().then((movies) => {
      setMovies(movies)
    }).catch((err) => console.log(err))
}, [])


  function onBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  function closePopup() {
    setIsInfoTooltipPopupOpen(false);
  }

  function historyReturn() {
    history.goBack();
  }

  function handleSearchSubmit(inputValue) {
    moviesApi.getMovies().then(movies => {
      const key = inputValue;
      let searchMovieList = movies.filter(o => o.nameRU === key || o.nameEN === key);
      setMovies(searchMovieList);
    }).catch((err) => console.log(err))
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Main/>
        </Route>
        <Route path='/movies'>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
          <main>
            <SearchForm handleSearchSubmit={handleSearchSubmit}/>
            <MoviesCardList movies={movies} moreMovies={true}/>
          </main>
          <Footer/>
        </Route>
        <Route path='/saved-movies'>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
          <main>
            <SearchForm />
            <MoviesCardList movies={movies} moreMovies={false}/>
          </main>
          <Footer/>
        </Route>
        <Route path='/profile'>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
          <Profile/>
        </Route>
        <Route path='/signup'>
          <Register/>
        </Route>
        <Route path='/signin'>
          <Login/>
        </Route>
        <Route path='*'>
          <NotFound historyReturn={historyReturn}/>
        </Route>
      </Switch>
      <InfoToolTip onClose={closePopup} isOpen={isInfoTooltipPopupOpen}/>
    </div>
  );
}

export default App;

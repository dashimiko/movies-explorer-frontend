import {Route, Switch, useHistory} from 'react-router-dom';
import {useState} from 'react';
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
import {movies} from '../../utils/constants'

function App() {

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(true);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const history = useHistory();

  function onBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  function closePopup() {
    setIsInfoTooltipPopupOpen(false);
  }

  function historyReturn() {
    history.goBack();
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Main/>
        </Route>
        <Route path='/movies'>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
          <SearchForm/>
          <MoviesCardList movies={movies} moreMovies={true}/>
          <Footer/>
        </Route>
        <Route path='/saved-movies'>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
          <SearchForm/>
          <MoviesCardList movies={movies} moreMovies={false}/>
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

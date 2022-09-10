import {Route, Switch} from 'react-router-dom';
import { useState } from 'react';
import Main from '../main/Main';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SearchForm from '../searchForm/SearchForm';
import MoviesCardList from '../moviesCardList/MoviesCardList';
import Profile from '../profile/Profile';

import {movies} from '../../utils/constants'

function App() {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function onBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen);
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
          <MoviesCardList movies={movies}/>
          <Footer/>
        </Route>
        <Route path='/saved-movies'>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
          <SearchForm/>
          <MoviesCardList movies={movies}/>
          <Footer/>
        </Route>
        <Route path='/profile'>
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
          <Profile/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

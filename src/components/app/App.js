import {Route, Switch} from 'react-router-dom';
import { useState } from 'react';
import Main from '../main/Main';
import Header from '../header/Header';

function App() {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function onBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/movie">
          <Header onBurgerClick={onBurgerClick} isBurgerOpen={isBurgerOpen}/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;

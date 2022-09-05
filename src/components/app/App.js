import {Route, Switch} from 'react-router-dom';
import Main from '../main/Main';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Promo from '../main/promo/Promo';

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/movie">
          <Header/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;

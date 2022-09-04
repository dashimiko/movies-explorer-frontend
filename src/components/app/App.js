import {Route, Switch} from 'react-router-dom';
import Main from '../main/Main';

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;

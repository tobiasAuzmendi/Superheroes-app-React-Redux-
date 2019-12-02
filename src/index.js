import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import HeroesList from './components/heroes/HeroesList';
import HeroDetail from './components/hero/HeroDetail';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/heroes"
          exact
          component={HeroesList}
        />
        <Route
          path="/heroes/:id"
          exact
          component={HeroDetail}
        />
        <Redirect to="/heroes" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

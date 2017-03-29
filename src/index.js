import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App';
import Home from './containers/Home';
import SignUp from './containers/Signup';
import Login from './containers/Login';
import RequireAuth from './containers/RequireAuth';
import Dashboard from './components/Dashboard';
import MatchPage from './containers/MatchPageContainer';
import {configureStore, loadState, saveState} from './store/configureStore';


const store = configureStore();

ReactDOM.render(
 <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="signup" component={SignUp}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="login" component={Login}/>
      <Route path="matchpage" component={RequireAuth(MatchPage)}/>
    </Route>
  </Router>
  </Provider>,
  document.getElementById('app')
);

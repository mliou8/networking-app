import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import './styles/index.css';

import App from './components/App';
import Home from './containers/Home';
import SignUp from './containers/Signup';
import Login from './containers/Login';
import Complete from './containers/CompleteContainer';
import RequireAuth from './containers/RequireAuth';
import Profile from './containers/ProfileContainer';
import MatchPage from './containers/MatchPageContainer';
import {configureStore} from './store/configureStore';

const store = configureStore();

ReactDOM.render(
 <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="signup" component={SignUp}/>
      <Route path="profile" component={Profile}/>
      <Route path="login" component={Login}/>
      <Route path="profile-complete" component={Complete}/>
      <Route path="matchpage" component={RequireAuth(MatchPage)}/>
    </Route>
  </Router>
  </Provider>,
  document.getElementById('app')
);

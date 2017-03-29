import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage'
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as Action from '../actions';


export function configureStore(initialState) {

  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(reduxThunk),
      persistState(),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.dispatch(Action.verifyAuth());

  return store;
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    //Ignore write errors
  }
}

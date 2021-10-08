import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
import { persistReducer } from 'redux-persist'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { createBrowserHistory } from 'history';

import RootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}

const history = createBrowserHistory();

const smartReducer = persistReducer(persistConfig, connectRouter(history)(RootReducer)
)

const configureStore = (initialState) => {
  return createStore(
    smartReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
      	routerMiddleware(history), // for dispatching history actions
      	thunk,
      )
    ))
}

export { configureStore, history }

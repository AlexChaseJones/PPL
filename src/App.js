import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'

import { configureStore, history } from './store';
import AppContainer from './containers/AppContainer';
import Routes from './Routes';
import './App.css';

const store = configureStore()

let persistor = persistStore(store)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <AppContainer>
              <Routes history={history}/>
            </AppContainer>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;

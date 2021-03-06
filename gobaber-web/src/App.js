import React from 'react';
import { Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import {ToastContainer} from 'react-toastify';

import Routes from './routes';
import history from './services/history';
import {store, persistor} from './store/index';
import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}> 
        <Router history={history}>
          <Routes/>  
            <GlobalStyles/>
            <ToastContainer autoClose={3000}></ToastContainer>
          </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

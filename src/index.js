import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(logger)
  )
);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

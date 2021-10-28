import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {movieList} from './mocks/movie-list';
import { reducer } from './store/reducer';
import { promo } from './types/const';
import App from './components/app/app';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        promo={promo}
        movies={movieList}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

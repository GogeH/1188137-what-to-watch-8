import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {movieList} from './mocks/movie-list';
import App from './components/app/app';
import { reducer } from './store/reducer';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

const promo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        promo={promo}
        movie={movieList}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

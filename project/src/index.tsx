import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { cardMovies } from './mocks/card-movies';

const title = 'The Grand Budapest Hotel';
const genre = 'Drama';
const release = 2014;

ReactDOM.render(
  <React.StrictMode>
    <App title={title}
      genre={genre}
      release={release}
      movie={cardMovies}
    />
  </React.StrictMode>,
  document.getElementById('root'));

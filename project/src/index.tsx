import React from 'react';
import ReactDOM from 'react-dom';
import { cardMovies } from './mocks/card-movies';
import App from './components/app/app';


const title = 'The Grand Budapest Hotel';
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

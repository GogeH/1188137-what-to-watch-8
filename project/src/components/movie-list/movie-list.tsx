import { useState, MouseEvent } from 'react';
import { Movies } from '../../types/types';
import MovieItem from '../movie-item/movie-item';

function MovieList(props: {
  movies: Movies,
}): JSX.Element {
  const [activeMovie, setActiveMovie] = useState('');

  const onSmallFilmCardHover = (evt: MouseEvent) => {
    setActiveMovie(evt.currentTarget.id);
  };

  const onSmallFilmCardLeave = () => {
    setActiveMovie('');
  };

  return (
    <div className="catalog__films-list">
      {props.movies.map((movie) => (
        <MovieItem card={movie}
          key={movie.id}
          isActive={movie.id === activeMovie}
          onMouseOver={onSmallFilmCardHover}
          onMouseLeave={onSmallFilmCardLeave}
        />
      ))}
    </div>
  );
}

export default MovieList;


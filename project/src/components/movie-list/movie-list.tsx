import { useState, MouseEvent } from 'react';
import { MovieFromServer } from '../../types/types';
import MovieItem from '../movie-item/movie-item';

function MovieList(props: {
  movies: MovieFromServer[],
  render?: (() => JSX.Element) | false,
}): JSX.Element {
  const [activeMovie, setActiveMovie] = useState('');

  const onSmallFilmCardHover = (evt: MouseEvent) => {
    setActiveMovie(evt.currentTarget.id);
  };

  const onSmallFilmCardLeave = () => {
    setActiveMovie('');
  };

  return (
    <>
      <div className="catalog__films-list">
        {props.movies.map((movie) => (
          <MovieItem movie={movie}
            key={movie.id}
            isActive={movie.id === Number(activeMovie)}
            handleMouseOver={onSmallFilmCardHover}
            handleMouseLeave={onSmallFilmCardLeave}
          />
        ))}
      </div>
      {props.render && props.render()}
    </>
  );
}

export default MovieList;

import React from 'react';
import {useState} from 'react';
import { FilmCards } from '../../types/types';
import CardItem from '../card-item/card-item';

function CardList(props: {
  movies: FilmCards,
}): JSX.Element {
  const { movies } = props;
  const [activeMovieId, setActiveMovieId] = useState(0);

  function activeMovie(id: number): void {
    setActiveMovieId(id);
  }

  return (
    <div className="catalog__films-list">
      {movies.map((movie) => <CardItem key={movie.id} card={movie} playing={movie.id === activeMovieId} activeMovie={activeMovie} />)}
    </div>
  );
}

export default CardList;

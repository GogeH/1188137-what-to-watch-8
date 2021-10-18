import React from 'react';
import {useState} from 'react';
import { FilmCards } from '../../types/types';
import CardItem from '../card-item/card-item';

function CardList(props: {
  movies: FilmCards,
}): JSX.Element {
  const { movies } = props;
  const [activeMovie, setActiveMovie] = useState('');

  const onSmallFilmCardHover = (evt: React.MouseEvent) => {
    setActiveMovie(evt.currentTarget.id);
  };

  const onSmallFilmCardLeave = () => {
    setActiveMovie('');
  };

  return (
    <div className="catalog__films-list">
      {movies.map((movie) => (
        <CardItem card={movie}
          key={movie.id}
          isActive={movie.id === activeMovie}
          onMouseOver={onSmallFilmCardHover}
          onMouseLeave={onSmallFilmCardLeave}
        />
      ))}
    </div>
  );
}

export default CardList;


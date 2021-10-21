import React from 'react';
import { FilmCard } from '../../types/types';
import { getRatingMovie, getFormatRating } from '../../utils/grade-movie';

function TabOverview(props: {
  movie: FilmCard,
}): JSX.Element {
  const { movie } = props;
  const { rating, count, description, director, starring  } = movie;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{getFormatRating(rating)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingMovie(Number(rating))}</span>
          <span className="film-rating__count">{count} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>
        <p className="film-card__director"><strong>Director: {director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {starring.slice(0, 4).join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default TabOverview;

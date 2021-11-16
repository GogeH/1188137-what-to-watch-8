import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/types';

function MovieCardButtonAddReview(props: {
  movie: Movie
}): JSX.Element {
  return (
    <Link to={`/films/${props.movie.id}/review`} className="btn film-card__button">Add review</Link>
  );
}

export default memo(MovieCardButtonAddReview);

import React from 'react';
import ReviewsItem from './reviews-item';
import { Reviews } from '../../types/types';

function TabReviews(props: {
  reviews: Reviews,
}): JSX.Element {
  const { reviews } = props;

  const firstHalfColumn: Reviews = reviews.slice(0, Math.ceil(reviews.length/2));
  const secondHalfColumn: Reviews = reviews.slice(-Math.ceil(reviews.length/2));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstHalfColumn.map((comment) => (
          <ReviewsItem review={comment} key={comment.id}/>
        ))}
      </div>
      <div className="film-card__reviews-col">
        {secondHalfColumn.map((comment) => (
          <ReviewsItem review={comment} key={comment.id}/>
        ))}
      </div>
    </div>
  );
}

export default TabReviews;

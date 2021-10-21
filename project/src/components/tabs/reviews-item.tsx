import React from 'react';
import { Review } from '../../types/types';
import { datetime, humanizedDateTime} from '../../utils/date';

function ReviewsItem (props: {
  review: Review,
}): JSX.Element {
  const { review } = props;
  const { name, date, comment, rating } = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={datetime(date)}>{humanizedDateTime(date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default ReviewsItem;

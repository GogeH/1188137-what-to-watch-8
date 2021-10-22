import { Review } from '../../types/types';
import { datetime, humanizedDateTime } from '../../utils/date';

function MovieReviewsTabItem (props: {
  review: Review,
}): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{props.review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{props.review.name}</cite>
          <time className="review__date" dateTime={datetime(props.review.date)}>{humanizedDateTime(props.review.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{props.review.rating}</div>
    </div>
  );
}

export default MovieReviewsTabItem;

import { CommentsFromServer } from '../../types/types';
import { getDatetime, getHumanizedDateTime } from '../../utils/get-date-time';

function MovieReviewsTabItem (props: {
  review: CommentsFromServer,
}): JSX.Element {
  const review = props.review;
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={getDatetime(review.date)}>{getHumanizedDateTime(review.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default MovieReviewsTabItem;

import MovieReviewsTabItem from './movie-reviews-tab-item';
import { CommentsFromServer } from '../../types/types';

function MovieReviewsTab(props: {
  reviews: CommentsFromServer[],
}): JSX.Element {
  const firstHalfColumn: CommentsFromServer[] = props.reviews.slice(0, Math.ceil(props.reviews.length/2));
  const secondHalfColumn: CommentsFromServer[] = props.reviews.slice(-Math.ceil(props.reviews.length/2));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstHalfColumn.map((comment) => (
          <MovieReviewsTabItem review={comment} key={comment.id}/>
        ))}
      </div>
      <div className="film-card__reviews-col">
        {secondHalfColumn.map((comment) => (
          <MovieReviewsTabItem review={comment} key={comment.id}/>
        ))}
      </div>
    </div>
  );
}

export default MovieReviewsTab;

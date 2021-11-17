import { useState, ChangeEvent, useEffect } from 'react';
import { generatePath, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../types/action';
import { fetchSelectedMovieAction, sendReview } from '../../store/api-action';
import { State } from '../../types/state';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { MovieParam } from '../../types/types';
import { redirectToRoute, setSelectedMovieId } from '../../store/action';
import { AppRoute } from '../../types/enum';
import { AuthorizationStatus } from '../../types/enum';
import StarListForMovie from '../star-list-for-movie/star-list-for-movie';

const SUBMITTING_FEEDBACK_MESSAGE = 'Спасибо за ваш отзыв о фильме!';
const ERROR_PUSH_REVIEW_MESSAGE = 'Что-то пошло не так, попробуйте написать отзыв немного позже!';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;
const DEFAULT_RATING_VALUE = 0;

function mapStateToProps({USER_AUTH, PROCESS_MOVIES}: State) {
  return {
    selectedMovie: PROCESS_MOVIES.selectedMovie,
    authorizationStatus: USER_AUTH.authorizationStatus,
  };
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  async onSubmit(data: { ratingValue: number, commentValue: string, movieId: number }) {
    await dispatch(sendReview(data));
  },
  fetchSelectedMovie(id: number) {
    dispatch(fetchSelectedMovieAction(id));
  },
  saveSelectedMovieId(id: number) {
    dispatch(setSelectedMovieId(id));
  },
  redirectToMoviePage(movieId: number) {
    dispatch(redirectToRoute(generatePath(AppRoute.Movie, { id: movieId })));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function ReviewForm(props: PropsFromRedux): JSX.Element {
  const { saveSelectedMovieId, fetchSelectedMovie} = props;
  const [ratingValue, setRatingValue] = useState<number>(DEFAULT_RATING_VALUE);
  const [commentValue, setCommentValue] = useState<string>('');
  const [formIsSending, setFormIsSending] = useState<boolean>(false);
  const { id } = useParams<MovieParam>();
  const idIsNumber = Number(id);
  const movieId = Number(props.selectedMovie?.id);

  useEffect(() => {
    saveSelectedMovieId(idIsNumber);
    fetchSelectedMovie(idIsNumber);
  });

  if (props.authorizationStatus !== AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.SignIn}/>;
  }

  const onChangeRating = (event: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(Number(event.currentTarget.value));
  };

  const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(event.target.value);
  };

  const isValidCommentValue = () => (
    commentValue.length >= MIN_COMMENT_LENGTH && commentValue.length <= MAX_COMMENT_LENGTH
  );

  const isValidRatingValue = () => ratingValue !== DEFAULT_RATING_VALUE;

  const isDisabledSubmitForm = () => (
    !isValidCommentValue() || !isValidRatingValue() || formIsSending
  );

  const onFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isDisabledSubmitForm()) {
      return;
    }

    try {
      setFormIsSending(true);
      await props.onSubmit({ ratingValue, commentValue, movieId });
      props.redirectToMoviePage(movieId);
      toast.info(SUBMITTING_FEEDBACK_MESSAGE);
    } catch (error) {
      toast.error(ERROR_PUSH_REVIEW_MESSAGE);
      setFormIsSending(false);
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={onFormSubmit} >
      <div className="rating">
        <div className="rating__stars">
          <StarListForMovie ratingValue={ratingValue} onChangeRating={onChangeRating}/>
        </div>
      </div>
      <div className="add-review__text">
        <textarea className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={onMessageChange}
          value={commentValue}
          disabled={formIsSending}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isDisabledSubmitForm()}>Post</button>
        </div>
      </div>
    </form>
  );
}

export { ReviewForm };
export default connector(ReviewForm);

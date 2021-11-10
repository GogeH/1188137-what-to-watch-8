import { useState, ChangeEvent, Fragment, useEffect } from 'react';
import { generatePath } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../types/action';
import { fetchSelectedMovieAction, sendReview } from '../../store/api-action';
import { State } from '../../types/state';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { MovieParam } from '../../types/types';
import { redirectToRoute, setSelectedMovieId } from '../../store/action';
import { AppRoute } from '../../types/enum';
// import { AuthorizationStatus } from '../../types/enum';
// import { SignIn } from '../sign-in/sign-in';

const SUBMITTING_FEEDBACK_MESSAGE = 'Спасибо за ваш отзыв о фильме!';
const ERROR_PUSH_REVIEW_MESSAGE = 'Что-то пошло не так, попробуйте написать отзыв немного позже!';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;
const RATING_STARS_COUNT = 10;
const DEFAULT_RATING_VALUE = 0;

function mapStateToProps({USER_AUTH, PROCESS_MOVIES}: State) {
  return {
    loadSelectedMovie: PROCESS_MOVIES.loadSelectedMovie,
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
  const [ratingValue, setRatingValue] = useState<number>(DEFAULT_RATING_VALUE);
  const [commentValue, setCommentValue] = useState<string>('');
  const [formIsSending, setFormIsSending] = useState<boolean>(false);
  const { id } = useParams<MovieParam>();
  const idIsNumber = Number(id);
  const movieId = Number(props.loadSelectedMovie.id);

  useEffect(() => {
    props.saveSelectedMovieId(idIsNumber);
    props.fetchSelectedMovie(idIsNumber);
  }, [props.fetchSelectedMovie, idIsNumber]);
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
      console.error(error);
      toast.error(ERROR_PUSH_REVIEW_MESSAGE);
      setFormIsSending(false);
    }
  };

  const renderRating = () => (
    new Array(RATING_STARS_COUNT).fill(null).map((currentValue, index) => {
      const number = index + 1;

      return (
        <Fragment key={number}>
          <input
            className="rating__input"
            id={`star-${number}`}
            type="radio"
            name="rating"
            value={number}
            checked={number === ratingValue}
            onChange={onChangeRating}
          />
          <label
            className="rating__label"
            htmlFor={`star-${number}`}
          >Rating {number}
          </label>
        </Fragment>
      );
    }).reverse()
  );

  const renderCommentField = () => (
    <textarea className="add-review__textarea"
      name="review-text"
      id="review-text"
      placeholder="Review text"
      onChange={onMessageChange}
      value={commentValue}
      disabled={formIsSending}
    >
    </textarea>
  );

  const renderBtnSubmit = () => (
    <div className="add-review__submit">
      <button className="add-review__btn" type="submit" disabled={isDisabledSubmitForm()}>Post</button>
    </div>
  );

  // if (props.authorizationStatus !== AuthorizationStatus.Auth) {
  //   return <SignIn />;
  // }

  return (
    <form action="#" className="add-review__form" onSubmit={onFormSubmit} >
      <div className="rating">
        <div className="rating__stars">
          {renderRating()}
        </div>
      </div>
      <div className="add-review__text">
        {renderCommentField()}
        {renderBtnSubmit()}
      </div>
    </form>
  );
}

export { ReviewForm };
export default connector(ReviewForm);

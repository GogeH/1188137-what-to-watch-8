import { Movie } from '../../types/types';
import { FavoriteStatus, FavoriteStatusType } from '../../types/enum';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFavoriteMovie, fetchMoviesAction, fetchPromoAction } from '../../store/api-action';
import { connect, ConnectedProps } from 'react-redux';

type MovieData = {
  movie: Movie,
  id: number,
  isFavorite: boolean,
}

function mapDispatchToProps(dispatch: ThunkAppDispatch) {
  return {
    async changeFavoriteStatus(movieId: number, status: FavoriteStatusType) {
      await dispatch(fetchFavoriteMovie(movieId, status));
    },
    changeMoviesAction() {
      dispatch(fetchMoviesAction());
    },
    changePromoAction() {
      dispatch(fetchPromoAction());
    },
  };
}

const connector = connect(null, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux & MovieData;

function MovieCardButtonFavoriteList(props: ConnectedComponentProps): JSX.Element {
  const onFavoriteButtonClick = () => {
    props.changeFavoriteStatus(props.id, props.isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite);
    props.changeMoviesAction();
    props.changePromoAction();
  };

  return (
    <button
      className="btn btn--list film-card__button"
      onClick={onFavoriteButtonClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={`#${!props.movie.isFavorite ? 'add' : 'in-list'}`} />
      </svg>
      <span>My list</span>
    </button>
  );
}

export { MovieCardButtonFavoriteList };
export default connector(MovieCardButtonFavoriteList);
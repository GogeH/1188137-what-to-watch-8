import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getFilterMovie } from '../../utils/get-filter-movie';
import { AuthorizationStatus, Genres} from '../../types/enum';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { setGenre, setLoadedMoviesCount } from '../../store/action';
import GenresList from '../genre-list/genres-list';
import Logo from '../logo/logo';
import MovieList from '../movie-list/movie-list';
import { INCREMENT_MOVIES_STEP } from '../../types/const';
import UserBlockLogged from '../user-block/user-block-logged';
import UserBlockUnLogged from '../user-block/user-block-un-logged';
import Footer from '../footer/footer';
import { fetchFavoriteMovie, fetchPromoAction } from '../../store/api-action';
import Loading from '../loading/loading';
import { FavoriteStatusType, FavoriteStatus } from '../../types/enum';
import MovieCardButtonPlay from '../movie-card-button-play/movie-card-button-play';

function mapStateToProps({MOVIES_DATA, PROCESS_MOVIES, USER_AUTH}: State) {
  const moviesByGenre = getFilterMovie(MOVIES_DATA.movies, PROCESS_MOVIES.genre);
  return {
    movies: MOVIES_DATA.movies,
    activeGenre: PROCESS_MOVIES.genre,
    loadedMoviesCount: PROCESS_MOVIES.loadedMoviesCount,
    totalMoviesCount: moviesByGenre.length,
    authorizationStatus: USER_AUTH.authorizationStatus,
    promo: MOVIES_DATA.promo,
  };
}

function mapDispatchToProps(dispatch: ThunkAppDispatch) {
  return {
    onGenreChange(genre: Genres) {
      dispatch(setGenre(genre));
    },
    setLoadedMoviesCount(count: number) {
      dispatch(setLoadedMoviesCount(count));
    },
    async changeFavoriteStatus(movieId: number, status: FavoriteStatusType) {
      await dispatch(fetchFavoriteMovie(movieId, status));
    },
    changePromoAction() {
      dispatch(fetchPromoAction());
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function Main(props: ConnectedComponentProps): JSX.Element {
  if(!props.promo) {
    return <Loading />;
  }

  const genres = Object.values(Genres) as Genres[];

  const { id, isFavorite } = props.promo;

  const handleShowMoreClick = () => {
    props.setLoadedMoviesCount(props.loadedMoviesCount + INCREMENT_MOVIES_STEP);
  };

  const onFavoriteButtonClick = () => {
    props.changeFavoriteStatus(id, isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite);
    props.changePromoAction();
  };

  return (
    <div>

      <section className="film-card">
        <div className="film-card__bg">
          <img src={props.promo?.backgroundImage} alt={props.promo?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Logo />
          </div>

          {props.authorizationStatus === AuthorizationStatus.Auth
            ?
            <UserBlockLogged />
            :
            <UserBlockUnLogged />}

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={props.promo?.posterImage} alt={props.promo?.name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{props.promo?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.promo?.genre}</span>
                <span className="film-card__year">{props.promo?.released}</span>
              </p>

              <div className="film-card__buttons">

                <MovieCardButtonPlay movie={props.promo}/>

                {props.authorizationStatus === AuthorizationStatus.Auth &&
                <button
                  className="btn btn--list film-card__button"
                  onClick={onFavoriteButtonClick}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={`#${!props.promo?.isFavorite ? 'add' : 'in-list'}`} />
                  </svg>
                  <span>My list</span>
                </button>}

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres} activeGenre={props.activeGenre} onGenreChange={props.onGenreChange} />

          <MovieList />

          {props.totalMoviesCount > props.loadedMoviesCount &&
          <div className="catalog__more">
            <button className="catalog__button"
              type="button"
              onClick={handleShowMoreClick}
            >
              Show more
            </button>
          </div>}
        </section>

        <Footer />

      </div>
    </div>
  );
}

export { Main };
export default connector(Main);

import React from 'react';
import { Link } from 'react-router-dom';
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

  const { id, isFavorite }: any = props.promo;

  const handleShowMoreClick = () => {
    props.setLoadedMoviesCount(props.loadedMoviesCount + INCREMENT_MOVIES_STEP);
  };
  const onFavoriteButtonClick = () => {
    props.changeFavoriteStatus(id, isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite);
    props.changePromoAction();
  };

  return (
    <div>
      <div className="visually-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <symbol id="add" viewBox="0 0 19 20">
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="+" fill="#EEE5B5"
                points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"
              />
            </g>
          </symbol>
          <symbol id="full-screen" viewBox="0 0 27 27">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z"
              fill="#FFF9D9" fillOpacity="0.7"
            />
            <path fillRule="evenodd" clipRule="evenodd"
              d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z"
              fill="#FFF9D9" fillOpacity="0.7"
            />
            <path fillRule="evenodd" clipRule="evenodd"
              d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7"
            />
            <path fillRule="evenodd" clipRule="evenodd"
              d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7"
            />
          </symbol>
          <symbol id="in-list" viewBox="0 0 18 14">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z"
              fill="#EEE5B5"
            />
          </symbol>
          <symbol id="pause" viewBox="0 0 14 21">
            <symbol id="play-s" viewBox="0 0 19 19">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
            </symbol>
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"/>
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"/>
            </g>
          </symbol>
        </svg>
      </div>

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
                <Link className="btn btn--play film-card__button" to={`/player/${props.promo?.id}`}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
                {props.authorizationStatus === AuthorizationStatus.Auth
                  ?
                  <button
                    className="btn btn--list film-card__button"
                    onClick={onFavoriteButtonClick}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={`#${!props.promo?.isFavorite ? 'add' : 'in-list'}`} />
                    </svg>
                    <span>My list</span>
                  </button>
                  :
                  ''}
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

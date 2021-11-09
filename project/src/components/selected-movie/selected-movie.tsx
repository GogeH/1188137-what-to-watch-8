import { State } from '../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { MovieFromServer } from '../../types/types';
import { MovieParam } from '../../types/types';
import MovieList from '../movie-list/movie-list';
import MovieTabs  from '../movie-tabs/movie-tabs';
import Error from '../error/error';
import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../types/enum';
import UserBlockLogged from '../user-block/user-block-logged';
import UserBlockUnLogged from '../user-block/user-block-un-logged';
import { ThunkAppDispatch } from '../../types/action';
import { fetchCommentsAction, fetchSelectedMovieAction, fetchSimilarMoviesAction } from '../../store/api-action';
import { useEffect } from 'react';
import { setSelectedMovieId } from '../../store/action';

function mapStateToProps({moviesFromServer, authorizationStatus, loadComments, loadSimilarMovies}: State) {
  return {
    moviesFromServer,
    authorizationStatus,
    loadComments,
    loadSimilarMovies,
  };
}

function mapDispatchToProps(dispatch: ThunkAppDispatch) {
  return {
    fetchSelectedMovie(id: number) {
      dispatch(fetchSelectedMovieAction(id));
    },
    fetchSimilarMovies(id: number) {
      dispatch(fetchSimilarMoviesAction(id));
    },
    saveSelectedMovieId(id: number) {
      dispatch(setSelectedMovieId(id));
    },
    fetchComments(id: number) {
      dispatch(fetchCommentsAction(id));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function SelectedMovie(props: ConnectedComponentProps): JSX.Element {
  const { id } = useParams<MovieParam>();
  const idIsNumber = Number(id);

  const selectedMovie = props.moviesFromServer.find((movie: MovieFromServer) => movie.id.toString() === id);

  useEffect(() => {
    props.saveSelectedMovieId(idIsNumber);
    props.fetchSelectedMovie(idIsNumber);
  }, [props.fetchSelectedMovie, idIsNumber]);

  useEffect(() => {
    props.fetchComments(idIsNumber);
  }, [props.fetchSelectedMovie, idIsNumber]);

  useEffect(() => {
    props.fetchSimilarMovies(idIsNumber);
  }, [idIsNumber]);

  if (!selectedMovie) {
    return <Error />;
  }

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={selectedMovie.backgroundImage} alt={selectedMovie.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Logo/>
            </div>

            {props.authorizationStatus === AuthorizationStatus.Auth
              ?
              <UserBlockLogged />
              :
              <UserBlockUnLogged />}

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{selectedMovie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{selectedMovie.genre}</span>
                <span className="film-card__year">{selectedMovie.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link className="btn btn--play film-card__button" to={`/player/${selectedMovie.id}`}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <Link className="btn btn--list film-card__button" to={'/myList'}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </Link>

                {props.authorizationStatus === AuthorizationStatus.Auth
                  ?
                  <Link to={`/films/${selectedMovie.id}/review`} className="btn film-card__button">Add review</Link>
                  :
                  ''}

              </div>
            </div>
          </div>
        </div>s

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={selectedMovie.previewImage} alt={selectedMovie.name} width="218"
                height="327"
              />
            </div>

            <MovieTabs movie={selectedMovie} reviews={props.loadComments}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <MovieList
              movies = {props.loadSimilarMovies.slice(0, 4)}
            />
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link className="logo__link logo__link--light" to="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export { SelectedMovie };
export default connector(SelectedMovie);



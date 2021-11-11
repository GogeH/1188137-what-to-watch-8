import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Movie } from '../../types/types';
import { MovieParam } from '../../types/types';
import MovieTabs  from '../movie-tabs/movie-tabs';
import Error from '../error/error';
import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../types/enum';
import UserBlockLogged from '../user-block/user-block-logged';
import UserBlockUnLogged from '../user-block/user-block-un-logged';
import { ThunkAppDispatch } from '../../types/action';
import { fetchCommentsAction, fetchSelectedMovieAction, fetchSimilarMoviesAction } from '../../store/api-action';
import { MouseEvent, useEffect, useState } from 'react';
import { setSelectedMovieId } from '../../store/action';
import MovieItem from '../movie-item/movie-item';

function mapStateToProps({MOVIES_DATA, USER_AUTH, COMMENTS_DATA}: State) {
  return {
    movies: MOVIES_DATA.movies,
    authorizationStatus: USER_AUTH.authorizationStatus,
    comments: COMMENTS_DATA.comments,
    similarMovies: MOVIES_DATA.similarMovies,
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
  const { saveSelectedMovieId, fetchSelectedMovie, fetchSimilarMovies, fetchComments } = props;
  const { id } = useParams<MovieParam>();
  const idIsNumber = Number(id);
  const [activeMovie, setActiveMovie] = useState('');

  const onSmallMovieCardHover = (evt: MouseEvent) => {
    setActiveMovie(evt.currentTarget.id);
  };

  const onSmallMovieCardLeave = () => {
    setActiveMovie('');
  };

  const selectedMovie = props.movies.find((movie: Movie) => movie.id.toString() === id);

  useEffect(() => {
    saveSelectedMovieId(idIsNumber);
    fetchSelectedMovie(idIsNumber);
  });

  useEffect(() => {
    fetchComments(idIsNumber);
  },[fetchComments, idIsNumber]);

  useEffect(() => {
    fetchSimilarMovies(idIsNumber);
  },[fetchSimilarMovies, idIsNumber]);

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

            <MovieTabs movie={selectedMovie} reviews={props.comments}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {props.similarMovies.map((movie) => (
              <MovieItem movie={movie}
                key={movie.id}
                isActive={movie.id === Number(activeMovie)}
                handleMouseOver={onSmallMovieCardHover}
                handleMouseLeave={onSmallMovieCardLeave}
              />
            )).slice(0, 4)}
          </div>

        </section>

        <footer className="page-footer">

          <Logo isCenter />

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



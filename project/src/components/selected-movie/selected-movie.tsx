import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import {  MovieFromServer } from '../../types/types';
import { AppRoute } from '../../types/enum';
import { reviewsList } from '../../mocks/reviews-list';
import MovieList from '../movie-list/movie-list';
import MovieTabs  from '../movie-tabs/movie-tabs';
import Error from '../error/error';
import Logo from '../logo/logo';

type MovieParam = {
  id: string;
}

function SelectedMovie(props: {
  movies: MovieFromServer[],
}): JSX.Element {
  const history = useHistory();
  const { id } = useParams<MovieParam>();

  const selectedMovie = props.movies.find((movie: MovieFromServer) => movie.id.toString() === id);

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

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a href="#user-block" className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{selectedMovie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{selectedMovie.genre}</span>
                <span className="film-card__year">{selectedMovie.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => history.push(AppRoute.Player)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button"
                  onClick={() => history.push(AppRoute.MyList)}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={AppRoute.Review} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={selectedMovie.previewImage} alt="The Grand Budapest Hotel poster" width="218"
                height="327"
              />
            </div>

            <MovieTabs movie={selectedMovie} reviews={reviewsList}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <MovieList
              movies = {props.movies.filter((item) => item.genre === selectedMovie.genre).slice(0, 4)}
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

export default SelectedMovie;

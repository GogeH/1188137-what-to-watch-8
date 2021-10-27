import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {  Movie } from '../../types/types';
import { AppRoute } from '../../types/const';
import MovieList from '../movie-list/movie-list';
import Logo from '../logo/logo';
import MovieTabs  from '../movie-tabs/movie-tabs';
import { movieList} from '../../mocks/movie-list';
import { reviewsList } from '../../mocks/reviews-list';

function Catalog(props: {
  movies: Movie[],
}): JSX.Element {
  const history = useHistory();

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={props.movies[0].backgroundImage} alt="The Grand Budapest Hotel"/>
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
              <h2 className="film-card__title">{props.movies[0].title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.movies[0].genre}</span>
                <span className="film-card__year">{props.movies[0].released}</span>
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
                  onClick={() => history.push(AppRoute.Card)}
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
              <img src={props.movies[0].imgSrc} alt="The Grand Budapest Hotel poster" width="218"
                height="327"
              />
            </div>

            <MovieTabs movie={movieList[0]} reviews={reviewsList}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <MovieList
              movies = {props.movies.filter((item) => item.genre === props.movies[0].genre).slice(0, 4)}
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

export default Catalog;

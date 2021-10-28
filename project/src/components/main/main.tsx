import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import { getFilterMovie, getMovieCount } from '../../utils/get-filter-movie';
import { AppRoute } from '../../types/const';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { Genres} from '../../types/const';
import { Promo } from '../../types/types';
import { selectedGenre } from '../../store/action';
import GenresList from '../genre-list/genre-list';
import Logo from '../logo/logo';
import MovieList from '../movie-list/movie-list';
import ShowMore from '../show-more/show-more';

function mapStateToProps({movies, genre}: State) {
  return {
    activeGenre: genre,
    movies: movies,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    onChangeGenre(genre: Genres) {
      dispatch(selectedGenre(genre));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux & {
  promo: Promo,
};

function Main(props: ConnectedComponentProps): JSX.Element {
  const history = useHistory();
  const genres = Object.values(Genres) as Genres[];

  const [filteredMovie, setFilteredMovie] = useState(getFilterMovie(props.movies, props.activeGenre ));

  useEffect(() => {
    setFilteredMovie(() => getFilterMovie(props.movies, props.activeGenre ));
  }, [props.activeGenre, props.movies]);

  const [movieCount, setMovieCount] = useState(getMovieCount(filteredMovie.length));

  useEffect(() => {
    setMovieCount(getMovieCount(filteredMovie.length));
  }, [filteredMovie, filteredMovie.length]);

  const [loadMore, setLoadMore] = useState(movieCount < filteredMovie.length);

  useEffect(() => {
    setLoadMore(movieCount < filteredMovie.length);
  }, [movieCount, filteredMovie.length]);

  const loadMoreMovie = useCallback(() => {
    setMovieCount((filmsCount) => getMovieCount(filteredMovie.length, filmsCount));
  }, [filteredMovie.length]);

  const changeGenreProps = props.onChangeGenre;

  const changeGenre = useCallback((genre) => {
    changeGenreProps(genre);
  }, [changeGenreProps]);

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
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Logo />
          </div>
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a href="/" className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{props.promo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.promo.genre}</span>
                <span className="film-card__year">{props.promo.release}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres} activeGenre={props.activeGenre} onChangeGenre={changeGenre} />

          <MovieList movies={filteredMovie.slice(0, movieCount)}
            render={loadMore && (() => <ShowMore loadMore={loadMoreMovie}/>)}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export { Main };
export default connector(Main);

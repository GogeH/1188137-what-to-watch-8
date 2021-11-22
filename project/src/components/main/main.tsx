import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getFilterMovie } from '../../utils/get-filter-movie';
import { Genres} from '../../types/enum';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { setGenre, setLoadedMoviesCount } from '../../store/action';
import GenresList from '../genre-list/genres-list';
import MovieList from '../movie-list/movie-list';
import { INCREMENT_MOVIES_STEP } from '../../types/const';
import Footer from '../footer/footer';
import PromoMovie from '../promo-movie/promo-movie';
import Loading from '../loading/loading';

function mapStateToProps({MOVIES_DATA, PROCESS_MOVIES}: State) {
  const moviesByGenre = getFilterMovie(MOVIES_DATA.movies, PROCESS_MOVIES.genre);
  return {
    movies: MOVIES_DATA.movies,
    activeGenre: PROCESS_MOVIES.genre,
    loadedMoviesCount: PROCESS_MOVIES.loadedMoviesCount,
    totalMoviesCount: moviesByGenre.length,
  };
}

function mapDispatchToProps(dispatch: ThunkAppDispatch) {
  return {
    async onGenreChange(genre: Genres) {
      await dispatch(setGenre(genre));
    },
    async setLoadedMoviesCount(count: number) {
      await dispatch(setLoadedMoviesCount(count));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function Main(props: ConnectedComponentProps): JSX.Element {
  if(!props.movies) {
    return <Loading />;
  }

  const genres = Object.values(Genres) as Genres[];

  const handleShowMoreClick = () => {
    props.setLoadedMoviesCount(props.loadedMoviesCount + INCREMENT_MOVIES_STEP);
  };

  return (
    <div>

      <PromoMovie />

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

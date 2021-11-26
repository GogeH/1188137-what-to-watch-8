import { connect, ConnectedProps } from 'react-redux';
import { getFilterMovie } from '../../utils/get-filter-movie';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { setGenre, setLoadedMoviesCount } from '../../store/action';
import GenresList from '../genre-list/genres-list';
import MovieList from '../movie-list/movie-list';
import { FIRST_LOADED_MOVIES, INCREMENT_MOVIES_STEP } from '../../types/const';
import Footer from '../footer/footer';
import PromoMovie from '../promo-movie/promo-movie';
import Loading from '../loading/loading';
import { useEffect } from 'react';
import ShowMore from '../show-more/show-more';
import { getGenresForMovie } from '../../utils/get-genres-for-movie';

function mapStateToProps({MOVIES_DATA, PROCESS_MOVIES}: State) {
  const moviesByGenre = getFilterMovie(MOVIES_DATA.movies, PROCESS_MOVIES.genre);
  return {
    genres: getGenresForMovie(MOVIES_DATA.movies),
    movies: MOVIES_DATA.movies,
    activeGenre: PROCESS_MOVIES.genre,
    loadedMoviesCount: PROCESS_MOVIES.loadedMoviesCount,
    totalMoviesCount: moviesByGenre.length,
  };
}

function mapDispatchToProps(dispatch: ThunkAppDispatch) {
  return {
    async onGenreChange(genre: string) {
      await dispatch(setGenre(genre));
    },
    async getLoadedMoviesCount(count: number) {
      await dispatch(setLoadedMoviesCount(count));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function Main(props: ConnectedComponentProps): JSX.Element {
  const { getLoadedMoviesCount, activeGenre } = props;

  useEffect(() => {
    getLoadedMoviesCount(FIRST_LOADED_MOVIES);
  }, [getLoadedMoviesCount, activeGenre]);

  if(!props.movies) {
    return <Loading />;
  }

  const handleShowMoreClick = () => {
    getLoadedMoviesCount(props.loadedMoviesCount + INCREMENT_MOVIES_STEP);
  };

  return (
    <div>

      <PromoMovie />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={props.genres} activeGenre={props.activeGenre} onGenreChange={props.onGenreChange} />

          <MovieList />

          {props.totalMoviesCount > props.loadedMoviesCount &&
            <ShowMore handleLoadMore={handleShowMoreClick} />}

        </section>

        <Footer />

      </div>
    </div>
  );
}

export { Main };
export default connector(Main);

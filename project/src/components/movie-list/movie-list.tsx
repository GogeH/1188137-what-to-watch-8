import { useState, MouseEvent } from 'react';
import MovieItem from '../movie-item/movie-item';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { getFilterMovie } from '../../utils/get-filter-movie';
import Loading from '../loading/loading';

function mapStateToProps({MOVIES_DATA, PROCESS_MOVIES}: State) {
  const moviesByGenre = getFilterMovie(MOVIES_DATA.moviesFromServer, PROCESS_MOVIES.genre);
  return {
    moviesFromServer: moviesByGenre.slice(0, PROCESS_MOVIES.loadedMoviesCount),
    isMoviesLoaded: MOVIES_DATA.isMoviesLoaded,
    loadedMoviesCount: PROCESS_MOVIES.loadedMoviesCount,
  };
}

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function MovieList(props: ConnectedComponentProps): JSX.Element {
  const [activeMovie, setActiveMovie] = useState('');

  const onSmallMovieCardHover = (evt: MouseEvent) => {
    setActiveMovie(evt.currentTarget.id);
  };

  const onSmallMovieCardLeave = () => {
    setActiveMovie('');
  };

  if(!props.isMoviesLoaded) {
    <Loading />;
  }

  return (
    <div className="catalog__films-list">
      {props.moviesFromServer.slice(0, props.loadedMoviesCount).map((movie) => (
        <MovieItem movie={movie}
          key={movie.id}
          isActive={movie.id === Number(activeMovie)}
          handleMouseOver={onSmallMovieCardHover}
          handleMouseLeave={onSmallMovieCardLeave}
        />
      ))}
    </div>
  );
}

export { MovieList };
export default connector(MovieList);

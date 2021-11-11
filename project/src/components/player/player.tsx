import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { MovieParam } from '../../types/types';
import { Movie } from '../../types/types';
import { useParams } from 'react-router';
import Error from '../error/error';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../types/enum';
import { useRef } from 'react';

function mapStateToProps({MOVIES_DATA}: State) {
  return {
    movies: MOVIES_DATA.movies,
  };
}

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function Player(props: ConnectedComponentProps): JSX.Element {
  const { id } = useParams<MovieParam>();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const selectedMovie = props.movies.find((movie: Movie) => movie.id.toString() === id);

  if (!selectedMovie) {
    return <Error />;
  }

  return (
    <div className="player">
      <video
        className="player__video"
        ref={videoRef}
        src={selectedMovie.videoLink}
        poster={selectedMovie.backgroundImage}
      />

      <Link
        className="player__exit"
        to={AppRoute.Movie.replace(':id', id.toString())}
      >
        Exit
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"/>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"/>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { Player };
export default connector(Player);


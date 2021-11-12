import { useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import { State } from '../../types/state';
import { MovieParam } from '../../types/types';
import { Movie } from '../../types/types';
import { AppRoute } from '../../types/enum';
import Error from '../error/error';
import PlayButton from './player-button';
import { Link } from 'react-router-dom';
import { getRemainingTime } from '../../utils/get-remaining-time';
import Spinner from '../spinner/spinnet';

const GHOST_PERCENTAGE = 100;
const LOADING_TIME = '00:00';

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
  const selectedMovie = props.movies.find((movie: Movie) => movie.id.toString() === id);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {current: videoElement} = videoRef;
  const progressBarRef = useRef<HTMLProgressElement>(null);
  const {current: progressBarElement} = progressBarRef;

  const [isReady, setReady] = useState(false);
  const [isPlay, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [{duration, remainingTime}, setDuration] = useState({duration: 0, remainingTime: 0});

  useEffect(() => {
    if (!isReady || !videoElement) {
      return;
    }

    const videoDuration = Math.round(videoElement.duration);
    setDuration((state) => ({
      ...state, duration: videoDuration, remainingTime: videoDuration,
    }));
  }, [isReady, videoElement]);

  useEffect(() => {
    const play = async (video: HTMLVideoElement) => {
      try {
        await video.play();
      } catch {
        setPlay(false);
      }
    };

    if (!videoElement) {
      return;
    }

    if (isPlay) {
      play(videoElement);
      return;
    }

    videoElement.pause();
  }, [isPlay, videoElement]);

  const RemainingMovieTime = isReady ? getRemainingTime(remainingTime) : LOADING_TIME;

  const handlerClickPlayButton = () => {
    setPlay((prevState) => !prevState);
  };

  const handlerLoadedData = () => {
    setReady(true);
  };

  const handlerTrackingTimeMovie = () => {
    if (!videoElement || !progressBarElement) {
      return;
    }

    const currentVideoTime = videoElement.currentTime;
    const currentPercentage = currentVideoTime / duration * GHOST_PERCENTAGE;
    const currentRemainingTime = Math.round(duration * (GHOST_PERCENTAGE - currentPercentage) / GHOST_PERCENTAGE);

    setDuration((state) => ({
      ...state, remainingTime: currentRemainingTime,
    }));
    setCurrentTime(currentPercentage);
    progressBarElement.value = currentVideoTime;
  };

  const handlerClickFullscreen = () => {
    if (videoElement) {
      videoElement.requestFullscreen();
    }
  };

  if (!selectedMovie) {
    return <Error />;
  }

  return (
    <div className="player">

      {!isReady && <Spinner />}

      <video
        className="player__video"
        ref={videoRef}
        src={selectedMovie.videoLink}
        poster={selectedMovie.previewImage}
        onTimeUpdate={handlerTrackingTimeMovie}
        onLoadedData={handlerLoadedData}
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
            <progress className="player__progress" max={duration} ref={progressBarRef}/>
            <div className="player__toggler" style={{left: `${currentTime}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{RemainingMovieTime}</div>
        </div>

        <div className="player__controls-row">
          <PlayButton
            isPlay={isPlay}
            isReady={isReady}
            playButtonClickHandler={handlerClickPlayButton}
          />

          <button
            type="button"
            className="player__full-screen"
            disabled={!isReady}
            onClick={handlerClickFullscreen}
          >

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


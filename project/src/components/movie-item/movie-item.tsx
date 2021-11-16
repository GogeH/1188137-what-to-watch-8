import { MouseEvent, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/types';
import VideoPreview from '../video-preview/video-preview';

function MovieItem(props: {
  movie: Movie,
}): JSX.Element {
  const [activeMovie, setActiveMovie] = useState('');
  const StringId = String(props.movie.id);

  const onMovieItemHover = (evt: MouseEvent) => {
    setActiveMovie(evt.currentTarget.id);
  };

  const onMovieItemLeave = () => {
    setActiveMovie('');
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={onMovieItemHover}
      onMouseLeave={onMovieItemLeave}
      id={StringId}
    >
      <div className="small-film-card__image">
        <VideoPreview
          poster={props.movie.previewImage}
          src={props.movie.videoLink}
          isPlaying={props.movie.id === Number(activeMovie)}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`/films/${props.movie.id}`}
          href="/"
        >
          {props.movie.name}
        </Link>
      </h3>
    </article>
  );
}

export default memo(MovieItem);

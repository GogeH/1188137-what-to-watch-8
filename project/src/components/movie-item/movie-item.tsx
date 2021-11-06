import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { MovieFromServer } from '../../types/types';
import VideoPreview from '../video-player/video-player';

function MovieItem(props: {
  movie: MovieFromServer,
  isActive: boolean,
  handleMouseOver: (evt: MouseEvent) => void,
  handleMouseLeave: (evt: MouseEvent) => void,
}): JSX.Element {
  const StringId = String(props.movie.id);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={props.handleMouseOver}
      onMouseLeave={props.handleMouseLeave}
      id={StringId}
    >
      <div className="small-film-card__image">
        <VideoPreview
          poster={props.movie.previewImage}
          src={props.movie.videoLink}
          isPlaying={props.isActive}
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

export default MovieItem;

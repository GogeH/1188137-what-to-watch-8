import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/types';
import VideoPreview from '../video-player/video-player';

function MovieItem(props: {
  card: Movie,
  isActive: boolean,
  onMouseOver: (evt: MouseEvent) => void,
  onMouseLeave: (evt: MouseEvent) => void,
}): JSX.Element {
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      id={props.card.id}
    >
      <div className="small-film-card__image">
        <VideoPreview
          poster={props.card.imgSrc}
          src={props.card.link}
          isPlaying={props.isActive}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`/films/${props.card.id}`}
          href="film-page.html"
        >
          {props.card.title}
        </Link>
      </h3>
    </article>
  );
}

export default MovieItem;

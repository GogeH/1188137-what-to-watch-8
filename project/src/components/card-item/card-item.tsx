import React from 'react';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { FilmCard } from '../../types/types';
import VideoPreview from '../video-player/video-player';

function CardItem(props: {
  card: FilmCard,
  isActive: boolean,
  onMouseOver: (evt: MouseEvent) => void,
  onMouseLeave: (evt: MouseEvent) => void,
}): JSX.Element {
  const { card, isActive, onMouseOver, onMouseLeave } = props;
  const { id, title, imgSrc, link } = card;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      id={id}
    >
      <div className="small-film-card__image">
        <VideoPreview
          poster={imgSrc}
          src={link}
          isPlaying={isActive}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`/films/${id}`}
          href="film-page.html"
        >
          {title}
        </Link>
      </h3>
    </article>
  );
}

export default CardItem;

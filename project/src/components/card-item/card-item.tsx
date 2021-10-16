import React from 'react';
import {Link} from 'react-router-dom';
import { FilmCard } from '../../types/types';

function CardItem(props: {
  card: FilmCard,
  playing: boolean,
  activeMovie: (id: number) => void,
}): JSX.Element {
  const { card, playing, activeMovie } = props;
  const { id, title, imgSrc } = card;

  const style = {
    color: 'white',
  };

  if (playing) {
    style.color = 'red';
  }

  return (
    <article
      className="small-film-card catalog__films-card" onMouseOver={() => {activeMovie(id);}}
    >
      <div className="small-film-card__image">
        <img src={imgSrc}
          alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"
        />
      </div>
      <h3 className="small-film-card__title" style={style}>
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

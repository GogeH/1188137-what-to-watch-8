import { MouseEvent } from 'react';
import { ViewGenre } from '../../types/view-genre';

const GENRES_ITEM_ACTIVE = 'catalog__genres-item--active';

function GenresList({genres, activeGenre, onChangeGenre}: ViewGenre): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          className={['catalog__genres-item',
            genre === activeGenre
              ?
              GENRES_ITEM_ACTIVE
              :
              ''].join(' ')}
          key={genre}
        >
          <a href="/" className="catalog__genres-link"
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              onChangeGenre(genre);}}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;

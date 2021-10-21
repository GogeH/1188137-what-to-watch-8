import React from 'react';
import { useState } from 'react';
import { FilmCard, Reviews } from '../../types/types';
import TabDetails from './tab-details';
import TabOverview from './tab-overview';
import TabReviews from './tab-reviews';

function Tabs(props: {
  movie: FilmCard,
  reviews: Reviews,
}): JSX.Element {
  const {movie, reviews} = props;

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const getActiveTab = (tab: number) => {
    switch (tab) {
      case 1: return <TabOverview movie={movie}/>;
      case 2: return <TabDetails movie={movie}/>;
      case 3: return <TabReviews reviews={reviews}/>;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={toggleState === 1 ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={() => toggleTab(1)}
          >
            <div className="film-nav__link">Overview</div>
          </li>
          <li className={toggleState === 2 ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={() => toggleTab(2)}
          >
            <div className="film-nav__link">Details</div>
          </li>
          <li className={toggleState === 3 ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={() => toggleTab(3)}
          >
            <div className="film-nav__link">Reviews</div>
          </li>
        </ul>
      </nav>
      <div className={'film-card__content film-card__content--active'}>
        {getActiveTab(toggleState)}
      </div>
    </div>
  );
}

export default Tabs;

import { useState } from 'react';
import { Movie, Reviews } from '../../types/types';
import MovieDetailsTab from './movie-details-tab';
import MovieOverviewTab from './movie-overview-tab';
import MovieReviewsTab from './movie-reviews-tab';

enum MovieTab {
  OverviewTab,
  DetailsTab,
  ReviewsTab,
}

function MovieTabs(props: {
  movie: Movie,
  reviews: Reviews,
}): JSX.Element {
  const [activeTab, setActiveTab] = useState<MovieTab>(MovieTab.OverviewTab);

  const showOverviewTab = () => {
    setActiveTab(MovieTab.OverviewTab);
  };

  const showDetailsTab = () => {
    setActiveTab(MovieTab.DetailsTab);
  };

  const showReviewsTab = () => {
    setActiveTab(MovieTab.ReviewsTab);
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={activeTab === MovieTab.OverviewTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={showOverviewTab}
          >
            <div className="film-nav__link">Overview</div>
          </li>
          <li className={activeTab === MovieTab.DetailsTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={showDetailsTab}
          >
            <div className="film-nav__link">Details</div>
          </li>
          <li className={activeTab === MovieTab.ReviewsTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={showReviewsTab}
          >
            <div className="film-nav__link">Reviews</div>
          </li>
        </ul>
      </nav>
      <div className={'film-card__content film-card__content--active'}>
        {activeTab === MovieTab.OverviewTab && <MovieOverviewTab movie={props.movie}/>}
        {activeTab === MovieTab.DetailsTab && <MovieDetailsTab movie={props.movie}/>}
        {activeTab === MovieTab.ReviewsTab && <MovieReviewsTab reviews={props.reviews}/>}
      </div>
    </div>
  );
}

export default MovieTabs;

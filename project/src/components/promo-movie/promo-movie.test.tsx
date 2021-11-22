import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../types/enum';
import PromoMovie from './promo-movie';
import { createMockMovie, createMockMovies } from '../../mocks/movieFake';
import { createMockAuthInfo } from '../../mocks/authorizationFake';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockMovies = createMockMovies();
const mockMovie = createMockMovie();
const mockAuth = createMockAuthInfo();

const store = mockStore({
  USER_AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
    authInfo: mockAuth,
  },
  MOVIES_DATA: {
    movies: mockMovies,
    promo: mockMovie,
  },
  PROCESS_MOVIES: {
    favoriteListMovies: mockMovies,
  },
});

describe('Component: PromoMovie', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <PromoMovie />
        </Router>
      </Provider>);

    expect(container.querySelector('.film-card__poster')).toBeInTheDocument();
    expect(container.querySelector('.film-card__desc')).toBeInTheDocument();
    expect(container.querySelector('.film-card__buttons')).toBeInTheDocument();
  });
});

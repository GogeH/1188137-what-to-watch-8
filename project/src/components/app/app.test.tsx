import { render, screen } from '@testing-library/react';
import { generatePath, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute, Genres } from '../../types/enum';
import App from './app';
import {  createStaticMockMovie, createStaticMockMovies } from '../../mocks/movieFake';
import { FIRST_LOADED_MOVIES } from '../../types/const';
import { createMockAuthInfo } from '../../mocks/authorizationFake';
import { createMockComments } from '../../mocks/commentsFake';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockMovies = createStaticMockMovies();
const mockMovie = createStaticMockMovie();
const mockAuth = createMockAuthInfo();
const mockComments = createMockComments();

const store = mockStore({
  USER_AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
    authInfo: mockAuth,
  },
  MOVIES_DATA: {
    isMoviesLoaded: true,
    movies: mockMovies,
    promo: mockMovie,
    similarMovies: mockMovies,
  },
  PROCESS_MOVIES: {
    genre: Genres.AllGenres,
    loadedMoviesCount: FIRST_LOADED_MOVIES,
    favoriteListMovies: mockMovies,
    selectedMovie: mockMovie,
    favoriteMovie: mockMovie,
  },
  COMMENTS_DATA: {
    comments: mockComments,
  },
});

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render Main when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should render AuthScreen when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should render Error when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/Error 404!/i)).toBeInTheDocument();
  });
});

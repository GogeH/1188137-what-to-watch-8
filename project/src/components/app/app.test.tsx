import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute } from '../../types/enum';
import App from './app';
import { createMockMovies } from '../../mocks/movieFake';
import { FIRST_LOADED_MOVIES } from '../../types/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockMovies = createMockMovies();

const ID_MOVIE = 4;

const store = mockStore({
  USER_AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  MOVIES_DATA: {
    isDataLoaded: true,
    movies: mockMovies,
  },
  PROCESS_MOVIES: {
    loadedMoviesCount: FIRST_LOADED_MOVIES,
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

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render Movie when user navigate to "/films/:id"', () => {
    history.push(`${AppRoute.Movie}/${ID_MOVIE}`);
    render(fakeApp);

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render Review when user navigate to /films/:id/review', () => {
    history.push(AppRoute.Review.replace(':id', ID_MOVIE.toString()));
    render(fakeApp);

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
  });

  it('should render Player when user navigate to /player/:id', () => {
    history.push(`${AppRoute.Player}/${ID_MOVIE}`);
    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });

  it('should render Player when user navigate to /myList', () => {
    history.push(AppRoute.MyList);
    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render Error when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/Error 404!/i)).toBeInTheDocument();
  });
});

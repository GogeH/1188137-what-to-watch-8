import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { createMockAuthInfo } from '../../mocks/authorizationFake';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import UserBlockLogged from './user-block-logged';
import { AppRoute } from '../../types/enum';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  'USER_AUTH': {authInfo: createMockAuthInfo()},
});

describe('Component: UserBlockLogged', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <UserBlockLogged />
        </Router>
      </Provider>
    );

    expect(screen.getAllByRole('link')[0].getAttribute('href')).toEqual(AppRoute.MyList);
    expect(screen.getAllByRole('link')[1].getAttribute('href')).toEqual('/');
  });

  it('should redirect to root url when user clicked to link in UserBlockLogged component', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.MyList} exact>
              <h1>This is MyList page</h1>
            </Route>
            <Route>
              <UserBlockLogged />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );

    expect(screen.queryByText(/This is MyList page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is MyList page/i)).toBeInTheDocument();
  });
});

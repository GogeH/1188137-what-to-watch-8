import { Router, Route, Switch } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/enum';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import SelectedMovie from '../selected-movie/selected-movie';
import Error from '../error/error';
import Player  from '../player/player';
import PrivateRoute from '../private-route/private-route';
import MovieList from '../movie-list/movie-list';
import Reviews from '../reviews/reviews';
import { State} from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import Loading from '../loading/loading';
import browserHistory from '../../browser-history';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({MOVIES_DATA, USER_AUTH}: State) => ({
  moviesFromServer: MOVIES_DATA.moviesFromServer,
  authorizationStatus: USER_AUTH.authorizationStatus,
  isMoviesLoaded: MOVIES_DATA.isMoviesLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  if (isCheckedAuth(props.authorizationStatus) || !props.isMoviesLoaded) {
    return <Loading />;
  }

  return  (
    <Router history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main />
        </Route>
        <Route path={AppRoute.SignIn} exact component={SignIn} />
        <PrivateRoute
          exact path={AppRoute.MyList}
          render={() => <MovieList />}
        />
        <Route path={AppRoute.Movie} exact component={SelectedMovie} />
        <Route path={AppRoute.Review} exact component={Reviews} />
        <Route path={AppRoute.Player} exact component={Player} />
        <Route component={Error}/>
      </Switch>
    </Router>
  );
}

export { App };
export default connector(App);

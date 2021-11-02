import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/enum';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import SelectedMovie from '../selected-movie/selected-movie';
import Error from '../error/error';
import Player  from '../player/player';
import PrivateRoute from '../private-route/private-route';
import MovieList from '../movie-list/movie-list';
import Reviews from '../reviews/reviews';
import { promo } from '../../types/const';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import Loading from '../loading/loading';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({ moviesFromServer, authorizationStatus, isAuthorization, isMoviesLoaded }: State) => ({
  moviesFromServer,
  authorizationStatus,
  isAuthorization,
  isMoviesLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  if (isCheckedAuth(props.authorizationStatus) || !props.isAuthorization) {
    return <Loading />;
  }

  if (!props.isMoviesLoaded) {
    return <Loading />;
  }

  return  (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main promo={promo}/>
        </Route>
        <Route path={AppRoute.SignIn} exact component={SignIn}/>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MovieList movies={props.moviesFromServer} />}
        />
        <Route path={AppRoute.Movie} exact render={() => <SelectedMovie movies={props.moviesFromServer} />}/>
        <Route path={AppRoute.Review} exact render={() => <Reviews movies={props.moviesFromServer} />}/>
        <Route path={AppRoute.Player} exact render={() => <Player movies={props.moviesFromServer} />}/>
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);

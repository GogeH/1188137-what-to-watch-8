import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/const';
import { Movie } from '../../types/types';
import { Promo } from '../../types/types';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Catalog from '../catalog/catalog';
import Reviews from '../reviews/reviews';
import Player  from '../player/player';
import PrivateRoute from '../private-route/private-route';
import MovieList from '../movie-list/movie-list';
import Error from '../error/error';

function App(props: {
  promo: Promo,
  movies: Movie[],
}): JSX.Element {
  return  (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main promo={props.promo}/>;
        </Route>
        <Route path="/login" exact component={SignIn}/>
        <PrivateRoute
          exact
          path="/myList"
          render={() => <MovieList movies={props.movies} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route path={AppRoute.Movie} exact render={() => <Catalog movies={props.movies} />}/>
        <Route path={AppRoute.Review} exact render={() => <Reviews movie={props.movies[0]} />}/>
        <Route path={AppRoute.Player} exact render={() => <Player movie={props.movies[0]} />}/>
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

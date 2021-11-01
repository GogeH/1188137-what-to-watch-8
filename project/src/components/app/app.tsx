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
import { movieList } from '../../mocks/movie-list';

function App(): JSX.Element {
  return  (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main promo={promo}/>
        </Route>
        <Route path="/login" exact component={SignIn}/>
        <PrivateRoute
          exact
          path="/myList"
          render={() => <MovieList movies={movieList} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route path={AppRoute.Movie} exact render={() => <SelectedMovie movies={movieList} />}/>
        <Route path={AppRoute.Review} exact render={() => <Reviews movie={movieList[0]} />}/>
        <Route path={AppRoute.Player} exact render={() => <Player movie={movieList[0]} />}/>
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

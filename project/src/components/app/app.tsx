import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/const';
import { Movies } from '../../types/types';
import { movieList} from '../../mocks/movie-list';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Catalog from '../catalog/catalog';
import Review from '../review/review';
import Player  from '../player/player';
import PrivateRoute from '../private-route/private-route';
import MovieList from '../movie-list/movie-list';
import Error from '../error/error';

function App(props: {
  title: string,
  genre: string,
  release: number,
  movie: Movies,
}): JSX.Element {
  return  (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main title={props.title} genre={props.genre} release={props.release} movies={props.movie}/>;
        </Route>
        <Route path="/login" exact component={SignIn}/>
        <PrivateRoute
          exact
          path="/myList"
          render={() => <MovieList movies={movieList} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route path={AppRoute.Movie} exact render={() => <Catalog movies={movieList}/>}/>
        <Route path={AppRoute.Review} exact render={() => <Review movie={movieList[0]} />}/>
        <Route path={AppRoute.Player} exact render={() => <Player movie={movieList[0]} />}/>
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

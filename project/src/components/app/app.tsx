import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/const';
import { FilmCards } from '../../types/types';
import { cardMovies } from '../../mocks/card-movies';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Movie from '../movie/movie';
import Review from '../review/review';
import Player  from '../player/player';
import PrivateRoute from '../private-route/private-route';
import CardList from '../card-list/card-list';
import Error from '../error/error';

function App(props: {
  title: string,
  genre: string,
  release: number,
  movie: FilmCards,
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
          render={() => <CardList movies={cardMovies} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route path={AppRoute.Movie} exact render={() => <Movie movies={cardMovies}/>}/>
        <Route path={AppRoute.Review} exact render={() => <Review movie={cardMovies[3]} />}/>
        <Route path={AppRoute.Player} exact render={() => <Player movie={cardMovies[1]} />}/>
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

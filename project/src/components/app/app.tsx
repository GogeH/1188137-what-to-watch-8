import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/const';
import Main from '../main/main';
import SignIn from '../signIn/signIn';
import Movie from '../movie/movie';
import Review from '../review/review';
import Player  from '../player/player';
import Error from '../error/error';
import PrivateRoute from '../privateRoute/privateRoute';
import Card from '../card/card';

function App(props: {
  title: string,
  genre: string,
  release: number,
}): JSX.Element {
  return  (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main title={props.title} genre={props.genre} release={props.release}/>;
        </Route>
        <Route path="/login" exact component={SignIn}/>
        <PrivateRoute
          exact
          path="/myList"
          render={() => <Card/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route path={AppRoute.Movie} exact component={Movie}/>
        <Route path={AppRoute.Review} exact component={Review}/>
        <Route path={AppRoute.Player} exact component={Player}/>
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

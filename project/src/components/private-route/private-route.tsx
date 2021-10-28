import { RouteProps } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/enum';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return (
    <Route
      exact={props.exact}
      path={props.path}
      render={() =>(
        props.authorizationStatus === AuthorizationStatus.NoAuth
          ? props.render()
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default  PrivateRoute;

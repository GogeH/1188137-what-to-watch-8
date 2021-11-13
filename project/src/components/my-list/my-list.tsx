import Logo from '../logo/logo';
import UserBlockLogged from '../user-block/user-block-logged';
import Footer from '../footer/footer';
import { AppRoute, AuthorizationStatus } from '../../types/enum';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';

function mapStateToProps({ USER_AUTH }: State) {
  return {
    authorizationStatus: USER_AUTH.authorizationStatus,
  };
}

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;


function MyList(props: ConnectedComponentProps): JSX.Element {
  if (props.authorizationStatus !== AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.SignIn}/>;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">

        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlockLogged />

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
      </section>

      <Footer />

    </div>

  );
}

export { MyList };
export default connector(MyList);


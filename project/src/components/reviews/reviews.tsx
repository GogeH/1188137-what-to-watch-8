import React from 'react';
import { State } from '../../types/state';
import { Link, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import Logo from '../logo/logo';
import ReviewForm from '../review-form/review-form';
import { Movie } from '../../types/types';
import { MovieParam } from '../../types/types';
import { useParams } from 'react-router';
import Error from '../error/error';
import { AppRoute, AuthorizationStatus } from '../../types/enum';
import UserBlockLogged from '../user-block/user-block-logged';
import UserBlockUnLogged from '../user-block/user-block-un-logged';

function mapStateToProps({USER_AUTH, MOVIES_DATA}: State) {
  return {
    movies: MOVIES_DATA.movies,
    authorizationStatus: USER_AUTH.authorizationStatus,
  };
}

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function Review(props: ConnectedComponentProps): JSX.Element {
  const { id } = useParams<MovieParam>();
  const selectedMovie = props.movies.find((movie: Movie) => movie.id.toString() === id);

  if (!selectedMovie) {
    return <Error />;
  }

  if (props.authorizationStatus !== AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.SignIn}/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={selectedMovie.backgroundImage} alt={selectedMovie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Logo />
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${selectedMovie.id}`} className="breadcrumbs__link">{selectedMovie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${selectedMovie.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          {props.authorizationStatus === AuthorizationStatus.Auth
            ?
            <UserBlockLogged />
            :
            <UserBlockUnLogged />}

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={selectedMovie.previewImage} alt={selectedMovie.name} width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm/>
      </div>

    </section>
  );
}

export { Review };
export default connector(Review);

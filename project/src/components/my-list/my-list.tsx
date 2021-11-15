import React, { MouseEvent, useEffect, useState } from 'react';
import Logo from '../logo/logo';
import UserBlockLogged from '../user-block/user-block-logged';
import Footer from '../footer/footer';
import { AppRoute, AuthorizationStatus } from '../../types/enum';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MovieItem from '../movie-item/movie-item';
import { fetchFavoriteListMovies } from '../../store/api-action';
import { ThunkAppDispatch } from '../../types/action';

function mapStateToProps({ USER_AUTH, PROCESS_MOVIES, MOVIES_DATA }: State) {
  return {
    authorizationStatus: USER_AUTH.authorizationStatus,
    favoriteListMovies: PROCESS_MOVIES.favoriteListMovies,
    movies: MOVIES_DATA.movies,
  };
}

function mapDispatchToProps(dispatch: ThunkAppDispatch) {
  return {
    changeFavoriteListMovies() {
      dispatch(fetchFavoriteListMovies());
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function MyList(props: ConnectedComponentProps): JSX.Element {
  const { changeFavoriteListMovies } = props;

  const [activeMovie, setActiveMovie] = useState('');

  useEffect(()=> {
    changeFavoriteListMovies();
  }, [changeFavoriteListMovies]);

  const onSmallMovieCardHover = (evt: MouseEvent) => {
    setActiveMovie(evt.currentTarget.id);
  };

  const onSmallMovieCardLeave = () => {
    setActiveMovie('');
  };

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

        <div className="catalog__films-list">

          {!props.favoriteListMovies
            ?
            ''
            :
            props.favoriteListMovies.map((movie) => (
              <MovieItem movie={movie}
                key={movie.id}
                isActive={movie.id === Number(activeMovie)}
                handleMouseOver={onSmallMovieCardHover}
                handleMouseLeave={onSmallMovieCardLeave}
              />
            ))}

        </div>
      </section>
      <Footer />
    </div>
  );
}

export { MyList };
export default connector(MyList);


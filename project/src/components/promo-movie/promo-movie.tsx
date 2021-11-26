import { connect, ConnectedProps } from 'react-redux';
import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../types/enum';
import UserBlockLogged from '../user-block-logged/user-block-logged';
import UserBlockUnLogged from '../user-block-logged/user-block-un-logged';
import MovieCardButtonPlay from '../movie-card-button-play/movie-card-button-play';
import { State } from '../../types/state';
import Spinner from '../spinner/spinner';
import MovieCardButtonListFavorite from '../movie-card-button-favorite-list/movie-card-button-favorite-list';

function mapStateToProps({MOVIES_DATA, USER_AUTH}: State) {
  return {
    movies: MOVIES_DATA.movies,
    authorizationStatus: USER_AUTH.authorizationStatus,
    promo: MOVIES_DATA.promo,
    promoIsLoading: MOVIES_DATA.promoIsLoading,
  };
}

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function PromoMovie(props: ConnectedComponentProps): JSX.Element {
  if(props.promoIsLoading) {
    return <Spinner />;
  }

  if(!props.promo) {
    return <div>Во время загрузки промо фильма возникли проблемы с сервером!</div>;
  }

  const { id, isFavorite } = props.promo;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={props.promo?.backgroundImage} alt={props.promo?.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <div className="logo">
          <Logo />
        </div>

        {props.authorizationStatus === AuthorizationStatus.Auth
          ?
          <UserBlockLogged />
          :
          <UserBlockUnLogged />}

      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={props.promo?.posterImage} alt={props.promo?.name} width="218" height="327"/>
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{props.promo?.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{props.promo?.genre}</span>
              <span className="film-card__year">{props.promo?.released}</span>
            </p>

            <div className="film-card__buttons">

              <MovieCardButtonPlay movie={props.promo}/>

              {props.authorizationStatus === AuthorizationStatus.Auth &&
              <MovieCardButtonListFavorite
                movie={props.promo}
                id={id}
                isFavorite={isFavorite}
              />}

            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

export { PromoMovie };
export default connector(PromoMovie);

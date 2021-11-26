import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { logoutAction } from '../../store/api-action';
import { State } from '../../types/state';
import { AppRoute } from '../../types/enum';


const mapStateToProps = ({USER_AUTH}: State) => ({
  authInfo: USER_AUTH.authInfo,
});


const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function UserBlockLogged(props: ConnectedComponentProps): JSX.Element {


  const dispatch = useDispatch();

  const handleSignInButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.MyList}>
          <div className="user-block__avatar">
            <img src={props.authInfo.avatarUrl} alt={props.authInfo.name} width="63" height="63" />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" href='/' onClick={handleSignInButtonClick}>Sign out</a>
      </li>
    </ul>
  );
}

export { UserBlockLogged };
export default connector(UserBlockLogged);


import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { logoutAction } from '../../store/api-action';
import { State } from '../../store/reducer';

const mapStateToProps = ({ authInfo }: State) => ({
  authInfo,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function UserBlockLogged(props: PropsFromRedux): JSX.Element {
  const dispatch = useDispatch();
  const handlerButtonClickLogout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={props.authInfo.avatarUrl} alt={props.authInfo.name} width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" href='/' onClick={handlerButtonClickLogout}>{props.authInfo.email}<br/>{props.authInfo.name}</a>
      </li>
    </ul>
  );
}

export { UserBlockLogged };
export default connector(UserBlockLogged);


import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../store/api-action';

function UserBlockLogged(): JSX.Element {
  const dispatch = useDispatch();
  const handlerButtonClickLogout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" href='/' onClick={handlerButtonClickLogout}>Sign out</a>
      </li>
    </ul>
  );
}

export default UserBlockLogged;

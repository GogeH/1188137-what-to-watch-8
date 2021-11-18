import { Link } from 'react-router-dom';
import { AppRoute } from '../../types/enum';
import { memo } from 'react';

function UserBlockUnLogged(): JSX.Element {
  return (
    <div className="user-block">
      <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
    </div>
  );
}

export default memo(UserBlockUnLogged);

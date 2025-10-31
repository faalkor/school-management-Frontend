import { FaHome, FaUserAlt, FaPencilAlt, FaSignOutAlt } from 'react-icons/fa';
import { Nav, LogoutButton } from './styled';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/modules/auth/slice';

export default function Header() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  return (
    <Nav>
      {!loggedIn && (
        <Link to="/login">
          <FaUserAlt size={24} />
        </Link>
      )}

      {loggedIn && (
        <Link to="/">
          <FaHome size={24} />
        </Link>
      )}

      {loggedIn && (
        <Link to="/edit">
          <FaPencilAlt size={24} />
        </Link>
      )}

      {loggedIn && (
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt size={24} />
        </LogoutButton>
      )}
    </Nav>
  );
}

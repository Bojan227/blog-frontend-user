import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useUserContext } from '../hooks/useUserContext';

const Nav = () => {
  const { user } = useUserContext();
  const { logout } = useLogout();

  return (
    <nav>
      <h1>
        Welcome back,{' '}
        {user && user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()}
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="create-post" style={{ textAlign: 'center' }}>
          <button>Create Post</button>
        </Link>
        <button onClick={logout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Nav;

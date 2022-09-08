import { useState } from 'react';
import { useUserContext } from './useUserContext';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { dispatch } = useUserContext();

  const login = async (username, password) => {
    setIsLoading(true);
    const res = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const json = await res.json();

    if (res.ok) {
      setMessage(json.message);
      setError('');
      // set global state for the user
      dispatch({ type: 'LOGIN', payload: json.user });
      // set cookies
      cookies.set('token', { user: json.user, token: json.token });
    } else {
      setError(json.error);
      setMessage('');
    }
    setIsLoading(false);
  };

  return { login, isLoading, error, message };
};

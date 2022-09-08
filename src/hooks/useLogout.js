import { useUserContext } from './useUserContext';

export const useLogout = () => {
  const { dispatch } = useUserContext();

  const logout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });
    document.cookie = 'token=; Max-Age=0; path=/';
  };

  return { logout };
};

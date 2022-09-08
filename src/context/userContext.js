import { createContext, useEffect, useReducer } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  useEffect(() => {
    if (cookies.get('token')?.user) {
      dispatch({ type: 'LOGIN', payload: cookies.get('token').user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

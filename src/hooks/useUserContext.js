import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error('You must use UserContext inside the provider');
  }

  return context;
};

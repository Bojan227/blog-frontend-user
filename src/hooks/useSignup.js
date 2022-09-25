import { useState } from 'react';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const signup = async (username, password) => {
    setIsLoading(true);
    const res = await fetch('https://blog-api-lys3.onrender.com/user/signup', {
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
    } else {
      setError(json.error);
      setMessage('');
    }
    setIsLoading(false);
  };

  return { signup, isLoading, error, message };
};

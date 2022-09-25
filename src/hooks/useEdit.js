import { useState } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const useEdit = () => {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updatePost = async (id, title, text, published, imgData, imgId) => {
    try {
      const res = await fetch(`https://blog-api-lys3.onrender.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('token').token}`,
        },
        body: JSON.stringify({ title, desc: text, published, img: imgData, imgId}),
      });
      const json = await res.json();
      setMessage(json.message);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return { updatePost, message, errorMessage };
};

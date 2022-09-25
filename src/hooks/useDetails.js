import { useState } from 'react';

export default function useDetails() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [url, setUrl] = useState('')
  const [error, setError] = useState('');

  const getPostDetails = async (id) => {
    setIsLoading(true);
    const res = await fetch(`https://blog-api-lys3.onrender.com/posts/${id}`);
    const json = await res.json();

    if (res.ok) {
      setTitle(json[0].title);
      setDescription(json[0].desc);
      setCreatedAt(json[0].createdAt);
      setUrl(json[0].img)
    } else {
      setError(json.msg);
    }
    setIsLoading(false);
  };

  return { getPostDetails, title, description, error, createdAt, isLoading, url };
}

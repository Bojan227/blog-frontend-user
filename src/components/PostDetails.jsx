import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useDetails from '../hooks/useDetails';
import { useUserContext } from '../hooks/useUserContext';
import parse from 'html-react-parser';
import LoadingSpinner from './LoadingSpinner';

export const PostDetails = () => {
  const {
    getPostDetails,
    title,
    description,
    error,
    createdAt,
    isLoading,
    url,
  } = useDetails();
  const { postId } = useParams();
  const { user } = useUserContext();

  useEffect(() => {
    getPostDetails(postId);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="post-details">
      <img src={url} alt="img" style={{ height: '350px', width: '100%' }} />
      <h1>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <h2>{user}</h2>
        <h2>{createdAt.split('T')[0]}</h2>
        <h4>5 min Read</h4>
      </div>
      <div
        className="description"
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        {parse(description)}
      </div>
      {error}
    </div>
  );
};

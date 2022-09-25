import { useState, useEffect } from 'react';
import { PostCard } from './PostCard';
import Cookies from 'universal-cookie';
import LoadingSpinner from './LoadingSpinner';
const cookies = new Cookies();

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getAuthorPosts = async () => {
      const res = await fetch(
        'https://blog-api-lys3.onrender.com/posts/authorPosts',
        {
          headers: { Authorization: `Bearer ${cookies.get('token').token}` },
        }
      );

      const json = await res.json();
      if (res.ok) {
        setPosts(json);
      }
      setIsLoading(false);
    };

    getAuthorPosts();
  }, []);

  const allPosts = posts.map(post => {
    return (
      <PostCard
        key={post._id}
        title={post.title}
        published={post.published}
        createdAt={post.createdAt}
        setPosts={setPosts}
        url={post.img}
        id={post._id}
      />
    );
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      style={{ backgroundColor: '#155e75', minHeight: '100vh', width: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div className="posts-container">
          {!allPosts.length ? <h1>Create your first post</h1> : allPosts}
        </div>
      </div>
    </div>
  );
}

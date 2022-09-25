import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const PostCard = ({
  title,
  createdAt,
  id,
  setPosts,
  published,
  url,
}) => {
  const [message, setMessage] = useState('');
  const { user } = cookies.get('token');

  const deletePost = async () => {
    const res = await fetch(`https://blog-api-lys3.onrender.com/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cookies.get('token').token}`,
      },
    });

    const json = await res.json();

    if (res.ok) {
      setPosts(prevState => prevState.filter(post => post._id !== json._id));
    } else {
      setMessage(json.msg);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="blog-card"
    >
      {message}
      <div>
        <img
          style={{ borderRadius: '10px', width: '450px', height: '50%' }}
          src={url}
          alt="img"
        />
        <Link to={`details/${id}`}>
          <h2
            style={{ fontWeight: '900', textAlign: 'center', color: 'white' }}
          >
            {title}
          </h2>
        </Link>
      </div>
      {published ? (
        <h3>Your post is published</h3>
      ) : (
        <h3>Your post is not published</h3>
      )}

      <div
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>{user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()}</h2>
        <h2>{createdAt.split('T')[0]}</h2>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '55px',
          width: '100%',
        }}
      >
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={deletePost}>Delete</button>
      </div>
    </div>
  );
};

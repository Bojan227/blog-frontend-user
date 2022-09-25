import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import LoadingSpinner from './LoadingSpinner';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading, message } = useSignup();

  const handleSubmit = async e => {
    e.preventDefault();
    await signup(username, password);
  };

  return (
    <div className="signup-container">
      <h1>Get Started</h1>
      <h3>
        Already have an account?{' '}
        <span>
          <Link to="login">Sign In</Link>
        </span>
      </h3>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white' }}>
        <label htmlFor="username">Username</label>
        <input onChange={e => setUsername(e.target.value)} value={username} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Sign Up</button>
      </form>

      <h3>{error}</h3>
      <h3>{message}</h3>
    </div>
  );
}

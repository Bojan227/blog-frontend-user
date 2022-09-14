import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { EditPost } from './components/EditPost';
import Nav from './components/Nav';
import { PostDetails } from './components/PostDetails';
import { useUserContext } from './hooks/useUserContext';
import { PostForm } from './components/PostForm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const { user } = useUserContext();

  return (
    <div className="main-container">
      <BrowserRouter>
        {user && <Nav />}
        <Routes>
          <Route path="/" element={user ? <Home /> : <Signup />} />
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />

          <Route path="/create-post" element={<PostForm />} />
          <Route path="/details/:postId" element={<PostDetails />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

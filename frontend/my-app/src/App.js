import { Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account';
import KanbanBoard from './components/KanbanBoard';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const { user, dispatch } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/users/account', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: "LOGIN", payload: { account: response.data } });
        } catch (error) {
          console.error("Failed to fetch user profile", error.response?.data || error.message);
        }
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="app-container">
      <header>
        {/* Apple logo inside a black box at the top */}
        <div className="logo-container">
          <div className="apple-logo-box">
            <img src="https://i.pinimg.com/474x/b0/d2/6e/b0d26e8122dffa8a51081f7f814581d7.jpg" alt="Apple Logo" />
          </div>
          <h1>Kanban Board App</h1>
        </div>

        <nav>
          <Link to="/">Home</Link> |
          {!user.isLoggedIn ? (
            <>
              <Link to="/register">Register</Link> |
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/account">Account</Link> |
              <Link to="/kanban">Kanban Board</Link> |
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/kanban" element={
            <PrivateRoute>
              <KanbanBoard />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;

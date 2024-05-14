import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AgentDashboard from './Components/Agent/AgentDashboard';
import Cookies from 'js-cookie';
import './Login.css';
import PropertyForm from './Components/property/PropertyForm';

const UserComponent = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null); // New state for error message

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7088/api/Authenticate/login', {
        Username: username,
        Password: password,
      });

      const getResponse = await fetch(`https://localhost:7088/api/User/userName/${username}`);
      const userData = await getResponse.json();

      const { token, expiration } = response.data;
      Cookies.set('authToken', token, { expires: new Date(expiration) });
      Cookies.set('userData', JSON.stringify(userData));
      Cookies.set('isLoggedIn', true);
      setIsLoggedIn(true);

      if (userData.roles.includes('Agent')) {
        navigate('/AgentDashboard');
      } else if (userData.roles.includes('Agency')) {
        navigate('/AgencyDashBoard');
      } else if (userData.roles.includes('Admin')) {
        navigate('/AdminDashBoard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);

      // Set the error state with an appropriate error message
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="form-ui">
      <form action="" method="post" id="form" onSubmit={handleLogin}>
        <div className="form-body">
          <div className="welcome-lines">
            <div className="welcome-line-1">Mi-Casa</div>
            <div className="welcome-line-2"></div>
          </div>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>} {/* Display red error message */}
          <div className="input-area">
            <div className="form-inp">
              <input
                className="username-input"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-inp">
              <input
                className="password-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="submit-button-cvr">
            <button className="submit-button" type="submit">
              Login
            </button>
          </div>
          <div className="forgot-pass">
            <a href="/"> Return Home </a>
          </div>
          <div className='Sign-Up'>
            <span>Don't have an account?   <div className='forgot-pass'>
              <a  href="/SignUp"> SignUp </a>
            </div></span>
          
          </div>
          <div className="bar"></div>
        </div>
      </form>
    </div>
  );
};

export default UserComponent;

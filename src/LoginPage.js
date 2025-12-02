import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifyUser } from './api'; // Import the functions
import xRayTeethImage from './assets/x-ray-teeth.jpg';  // Import the image

const LoginPage = ({ handleLogInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await VerifyUser(username, password);

      console.log(response);
      localStorage.setItem('access_token', response.data.access_token);

      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100" style={{ backgroundImage: `url(${xRayTeethImage})` }}>
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Left Side: Login Form */}
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${xRayTeethImage})` }}>
          {/* Side Image */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('walletAddress', data.walletAddress);
        localStorage.setItem('username', data.username); // Store username
        navigate('/profile'); // Redirect to profile page after login
      } else {
        // Display specific error message
        setError(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form 
          onSubmit={handleLogin} 
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <img
              src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
              alt="Twitter logo"
              className="mx-auto mb-4"
              style={{ width: '50px', height: '50px' }}
            />
            <h2 className="text-center text-xl font-bold mb-6">Log in to Twitter</h2>
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Phone, email, or username"
              className="w-full px-3 py-2 mb-4 border rounded text-sm"
              required 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password"
              className="w-full px-3 py-2 mb-6 border rounded text-sm"
              required 
            />
            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log in
            </button>
          </div>
          <div className="text-center">
            <a href="/" className="font-bold text-sm text-blue-500 hover:text-blue-800">
              Sign up for Twitter
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

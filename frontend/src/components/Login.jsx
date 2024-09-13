import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('walletAddress', data.walletAddress);
      navigate('/home');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="w-3/5 min-h-screen bg-white text-black flex flex-col items-center py-10 mt-32 ml-[100px]">
      <div className="bg-cyan-400 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
          <button 
            type="submit" 
            className="w-full py-3 bg-cyan-300 text-white font-semibold rounded-lg  transition-colors duration-300"
          >
            Login
          </button>
          <a href="/" className='hover:text-black'>Are you new here Create an account</a>
        </form>
      </div>
    </div>
  );
}

export default Login;

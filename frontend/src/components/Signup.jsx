import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const connectToMetamask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log("Connected to MetaMask with address:", signer.address);
        return signer.address;
      } else {
        alert('Please install MetaMask');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect to MetaMask.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const walletAddress = await connectToMetamask();
    if (!walletAddress) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, walletAddress }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/login');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed.');
    }
  };

  return (
    <div className="w-3/5 min-h-screen bg-white text-white flex flex-col items-center py-10 mt-32 ml-[100px]">
      <div className="bg-cyan-400 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-white mb-6">Signup</h2>
        <form onSubmit={handleSignup}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
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
            className="w-full py-3 bg-cyan-300 text-white font-semibold rounded-lg hover:bg-cyan-300 transition-colors duration-300"
          >
            Signup
          </button>
          <a href='/login' className='hover:text-black'>Already have an account Login Here</a>
        </form>
      </div>
    </div>
  );
}

export default Signup;

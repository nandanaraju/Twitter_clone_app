// Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  // Function to connect to MetaMask
  const connectToMetamask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []); // Request access
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Set wallet address and store it in localStorage
        setWalletAddress(address);
        localStorage.setItem('walletAddress', address);
        console.log('Connected to MetaMask with address:', address);

        return address;
      } else {
        alert('Please install MetaMask');
        return null;
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect to MetaMask.');
      return null;
    }
  };

  // Function to handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Connect to MetaMask and get wallet address
    const address = await connectToMetamask();
    if (!address) {
      return;
    }

    try {
      // Send signup request to backend API
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, walletAddress: address }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store token and username in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('walletAddress', data.walletAddress);
        navigate('/profile'); // Redirect to profile page
      } else {
        // Display specific error message
        setError(data.msg || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Signup failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <img
              src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
              alt="Twitter logo"
              className="mx-auto mb-4"
              style={{ width: '50px', height: '50px' }}
            />
            <h2 className="text-center text-xl font-bold mb-6">
              Sign up for Twitter
            </h2>
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-3 py-2 mb-4 border rounded text-sm"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
              Sign up
            </button>
          </div>
          <div className="flex items-center justify-between">
            <a
              href="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Already have an account? Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

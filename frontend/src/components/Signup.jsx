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
        return signer.address; // Return wallet address after connecting
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
      return; // If MetaMask is not connected, stop the signup process
    }

    // Proceed with signup only after MetaMask is connected
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
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;

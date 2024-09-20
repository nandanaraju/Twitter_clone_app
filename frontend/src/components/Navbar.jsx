import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const [hasToken, setHasToken] = useState(false); // State to track if token exists
  const navigate = useNavigate(); 

  // Check for token in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token); // If token exists, set hasToken to true
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setHasToken(false); // Remove token and update state
    navigate('/login'); 
  };

  return (
    <div className="p-4 bg-white ">
      <ul className="flex justify-end">
        {hasToken ? (
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Logout
            </button>
          </li>
        ) : null} 
      </ul>
    </div>
  );
};

export default Navbar;

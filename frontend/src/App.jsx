import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Middle from './components/Middle';
import Right from './components/Right';

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        <div className="flex-grow flex flex-row justify-between">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Middle />} />
          </Routes>
          {/* Right Section */}
          <Right />
        </div>
      </div>
    </Router>
  );
}

export default App;

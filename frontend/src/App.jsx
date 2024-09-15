import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Middle from './components/Middle';
import Right from './components/Right';
import Explore from './components/Explore';  // Import Explore component
// import Profile from './components/Profile';  // Assuming there's a Profile component

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-grow flex flex-row justify-between">
          {/* Middle Section with Routing */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Middle />} />
              <Route path="/explore" element={<Explore />} />  {/* Explore Route */}
              {/* <Route path="/profile" element={<Profile />} />  Profile Route */}
            </Routes>
          </div>
          
          {/* Right Section */}
          <Right />
        </div>
      </div>
    </Router>
  );
}

export default App;

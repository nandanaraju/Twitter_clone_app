import React from 'react';
import { FaHome, FaHashtag, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaEllipsisH } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs'; // Twitter logo icon
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-1/6 h-screen flex flex-col p-4 items-start">
      {/* Twitter Logo */}
      <div className="text-2xl font-bold mb-6">
        <BsTwitter className="text-blue-500 w-10 h-10" />
      </div>

      {/* Navigation */}
      <nav className="space-y-6 w-full font-bold text-black">
        <a href="/home" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <FaHome className="text-2xl" />
          <span>Home</span>
        </a>
        <Link to="/explore" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <FaHashtag className="text-2xl" />
          <span>Explore</span>
        </Link>
        <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <FaBell className="text-2xl" />
          <span>Notifications</span>
        </a>
        <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <FaEnvelope className="text-2xl" />
          <span>Messages</span>
        </a>
        <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <FaBookmark className="text-2xl" />
          <span>Bookmarks</span>
        </a>
        <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <FaList className="text-2xl" />
          <span>Lists</span>
        </a>
        <a href="/profile" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <FaUser className="text-2xl" />
          <span>Profile</span>
        </a>
        <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <FaEllipsisH className="text-2xl" />
          <span>More</span>
        </a>
      </nav>

    
    </div>
  );
}

export default Sidebar;

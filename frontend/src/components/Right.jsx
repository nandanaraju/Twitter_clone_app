import React from 'react';

function Right() {
  return (
    <div className="w-1/4 bg-gray-100 h-screen p-4">
        {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Twitter"
          className="w-full p-2 rounded-full border-gray-300"
        />
      </div>
      <h2 className="text-xl font-bold mb-4">What's happening</h2>

      {/* Hardcoded Content */}
      <div className="mb-6">
        <p className="text-gray-700">
          <span className="font-bold">Cinemas are back!</span> 🎬🍿
        </p>
      </div>
      <div className="mb-6">
        <p className="text-gray-700">
          <span className="font-bold">India's win celebration</span> 🏏🎉
        </p>
      </div>
      <div className="mb-6">
        <p className="text-gray-700">
          <span className="font-bold">Massive hit movie!</span> 🔥🎥
        </p>
      </div>
    </div>
  );
}

export default Right;

import React from 'react';
import Navbar from './Navbar';

function Right() {
  return (
    <>
    
    <div className="w-1/4 bg-white h-screen p-4">
    <Navbar/>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Blockchain"
          className="w-full p-2 rounded-full border-gray-300 bg-gray-100"
        />
      </div>
      
      {/* Title */}
      <h2 className="text-lg font-bold mb-4">What's happening</h2>

      {/* Blockchain Content in Card Style */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <p className="text-gray-700">
          <span className="font-bold">Ethereum 2.0 Launch</span> 🚀🔗
        </p>
        <p className="text-sm text-gray-500">The upgrade promises to bring improved scalability and security.</p>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <p className="text-gray-700">
          <span className="font-bold">DeFi Explodes</span> 💰📈
        </p>
        <p className="text-sm text-gray-500">Decentralized Finance (DeFi) market crosses $100 billion in value.</p>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <p className="text-gray-700">
          <span className="font-bold">Bitcoin ETF Approved</span> 🏛️📊
        </p>
        <p className="text-sm text-gray-500">First Bitcoin Exchange-Traded Fund (ETF) gets approval, opening the market to institutional investors.</p>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <p className="text-gray-700">
          <span className="font-bold">NFTs Continue to Boom</span> 🎨💎
        </p>
        <p className="text-sm text-gray-500">Non-Fungible Tokens (NFTs) redefine digital ownership in the art world.</p>
      </div>
    </div>
    </>
  );
}

export default Right;

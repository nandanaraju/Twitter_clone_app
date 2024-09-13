import React from 'react';
import TweetBox from './TweetBox';
// import TweetFeed from './TweetFeed';

function Middle() {
  return (
    <div className='w-3/5 min-h-screen bg-white text-black flex flex-col items-center py-10'>
    
      <TweetBox />
      {/* <TweetFeed/> */}
    </div>
  );
}

export default Middle;

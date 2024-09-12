import React from 'react';
import TweetBox from './TweetBox';
import TweetFeed from './TweetFeed';

function Middle() {
  return (
    <div className="middle-section pr-[500px]">
      <TweetBox />
      <TweetFeed/>
    </div>
  );
}

export default Middle;

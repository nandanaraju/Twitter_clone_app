import React, { useState } from 'react';

function TweetBox() {
  const [tweet, setTweet] = useState('');

  const postTweet = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: tweet }),
      });

      if (!response.ok) {
        throw new Error('Failed to post tweet');
      }

      const data = await response.json();
      console.log(data);
      alert('Tweet posted successfully!');
      setTweet('');  // Reset the input field after posting
    } catch (error) {
      console.error('Error posting tweet:', error);
      alert('Failed to post tweet.');
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        placeholder="What's happening?"
        className="border p-2 w-full"
      />
      <button onClick={postTweet} className="bg-blue-500 text-white p-2 mt-2">
        Tweet
      </button>
    </div>
  );
}

export default TweetBox;

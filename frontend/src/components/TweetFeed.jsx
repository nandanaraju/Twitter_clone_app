import React, { useEffect, useState } from 'react';

function TweetFeed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tweets');
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }

        const data = await response.json();
        setTweets(data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      {tweets.length === 0 ? (
        <p>No tweets yet!</p>
      ) : (
        tweets.map((tweet, index) => (
          <div key={index} className="border-b p-4">
            <p>
              <strong>{tweet.user}</strong>: {tweet.content}
            </p>
            <p>{new Date(tweet.timestamp * 1000).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TweetFeed;

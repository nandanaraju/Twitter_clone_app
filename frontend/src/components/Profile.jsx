// Profile.jsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../scdata/TweetContract.json"; // Smart contract ABI
import { TwitterModuleTweet } from "../scdata/deployed_addresses.json"; // Contract address

const Profile = () => {
  const [account, setAccount] = useState(localStorage.getItem("walletAddress"));
  const [username, setUsername] = useState(localStorage.getItem("username")); // Retrieve from localStorage
  const [tweets, setTweets] = useState([]);
  const [contract, setContract] = useState(null);
  const [deletedTweets, setDeletedTweets] = useState([]);

  // Helper function to get deleted tweets from localStorage
  const getDeletedTweets = () => {
    if (!account) return [];
    const deleted = localStorage.getItem(`deletedTweets_${account}`);
    return deleted ? JSON.parse(deleted) : [];
  };

  // Helper function to add a tweet to the deleted list
  const deleteTweet = (tweetId) => {
    const updatedDeleted = [...deletedTweets, tweetId];
    setDeletedTweets(updatedDeleted);
    localStorage.setItem(`deletedTweets_${account}`, JSON.stringify(updatedDeleted));
  };

  useEffect(() => {
    // Ensure username is up-to-date
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Update state with username from localStorage
    }
  }, []); // Runs only once on mount

  useEffect(() => {
    const connectToContract = async () => {
      const ethereumProvider = window.ethereum;
      if (ethereumProvider) {
        try {
          const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
          const signer = await ethersProvider.getSigner();
          const tweetContract = new ethers.Contract(
            TwitterModuleTweet,
            abi,
            signer
          );

          setContract(tweetContract);

          // Load deleted tweets for this account
          const deleted = getDeletedTweets();
          setDeletedTweets(deleted);

          // Load tweets authored by the current user
          const allTweets = await tweetContract.getAllTweets();
          const userTweets = allTweets.filter(
            (tweet) => tweet.author.toLowerCase() === account.toLowerCase()
          );

          // Convert BigInt timestamps to numbers if necessary
          const processedTweets = await Promise.all(
            userTweets.map(async (tweet, index) => {
              const comments = await tweetContract.getComments(index);

              const formattedComments = comments.map((comment) => ({
                content: comment.commentContent,
                commenter: comment.commenter,
                timestamp: Number(comment.timestamp),
              }));

              return {
                id: index, // Assign the index as a unique identifier
                content: tweet.content,
                author: tweet.author,
                timestamp: Number(tweet.timestamp),
                likeCount: Number(tweet.likeCount),
                retweetCount: Number(tweet.retweetCount),
                comments: formattedComments, // Store the fetched comments
              };
            })
          );

          // Filter out deleted tweets
          const visibleTweets = processedTweets.filter(
            (tweet) => !deleted.includes(tweet.id)
          );

          setTweets(visibleTweets);
        } catch (error) {
          console.error("Error connecting to contract:", error);
        }
      }
    };

    if (account) {
      connectToContract();
    }
  }, [account]);

  const handleDeleteTweet = (tweetId) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      deleteTweet(tweetId);
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 shadow-md">
        <div className="flex items-center">
          <img
            src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{username ? username : "Loading..."}</h1> {/* Username rendering */}
            <p className="text-gray-500">
              @{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Loading..."}
            </p>
            <p className="text-gray-500">Joined October 2020</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold">Your Tweets</h2>
          {tweets.length === 0 ? (
            <p className="text-center text-gray-400">No tweets yet.</p>
          ) : (
            tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="p-4 bg-gray-100 rounded-md mt-4 flex justify-between items-start"
              >
                <div>
                  <p className="text-base">{tweet.content}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(tweet.timestamp * 1000).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteTweet(tweet.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <a href="/home" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
          <span className="mt-8 w-full bg-blue-500 text-white py-2 rounded-full text-xl hover:bg-blue-600 px-8">Tweet</span>
        </a>
      </div>
    </div>
  );
};

export default Profile;

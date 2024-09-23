import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../scdata/TweetContract.json"; // Smart contract ABI
import { TwitterModuleTweet } from "../scdata/deployed_addresses.json"; // Contract address

const Profile = () => {
  const [account, setAccount] = useState(localStorage.getItem("walletAddress"));
  const [username, setUsername] = useState(localStorage.getItem("username")); // Retrieve from localStorage
  const [tweets, setTweets] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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

          // Load tweets for this user (filtered by account)
          const allTweets = await tweetContract.getAllTweets();
          console.log("All Tweets:", allTweets); // Debugging line

          const userTweets = allTweets.filter(
            (tweet) => tweet.author.toLowerCase() === account.toLowerCase()
          );

          // Convert BigInt timestamps to numbers if necessary and map properties
          const processedTweets = userTweets.map((tweet, index) => ({
            id: index, // Assign a unique identifier
            content: tweet.content, // Explicitly map 'content'
            author: tweet.author,
            timestamp: Number(tweet.timestamp), // Convert BigInt to number
            likeCount: Number(tweet.likeCount),
            retweetCount: Number(tweet.retweetCount),
          }));

          setTweets(processedTweets);
        } catch (error) {
          console.error("Error connecting to contract:", error);
        }
      }
    };

    if (account) {
      connectToContract();
    }
  }, [account]);

  return (
    <div
      className="min-h-screen text-black flex flex-col items-center"
      style={{
        backgroundImage:
          "url('https://videocdn.cdnpk.net/videos/af9b822f-03cd-4daa-8b17-68f2ed6267db/horizontal/thumbnails/large.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-2xl p-6 shadow-md mt-16">
        <div className="flex items-center">
          <img
            src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div className="ml-6">
            <h1 className="text-2xl text-white font-bold">
              {username ? username : "Loading..."}
            </h1>
            <p className="text-white">
              @{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Loading..."}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white">Your Tweets</h2>
          {tweets.length === 0 ? (
            <p className="text-center text-gray-400">No tweets yet.</p>
          ) : (
            tweets.map((tweet) => (
              <div key={tweet.id} className="p-4 bg-gray-100 rounded-md mt-4">
                <p>{tweet.content}</p> {/* Ensure 'content' is displayed */}
                <p className="text-sm text-gray-500">
                  {new Date(tweet.timestamp * 1000).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <a
          href="/home"
          className="flex items-center space-x-4 text-xl text-black hover:text-blue-500"
        >
          <span className="mt-8 w-full bg-white text-blue-500 py-2 rounded-full text-xl hover:bg-blue-600 px-8">
            Tweet
          </span>
        </a>
      </div>
    </div>
  );
};

export default Profile;

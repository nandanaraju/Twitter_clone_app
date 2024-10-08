// App.jsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../scdata/TweetContract.json"; // TweetContract ABI
import { TwitterModuleTweet } from "../scdata/deployed_addresses.json"; // Contract address

function App() {
  const [tweetContent, setTweetContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [tweets, setTweets] = useState([]);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
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

  // Connect to MetaMask and load tweets
  useEffect(() => {
    const connectToMetamask = async () => {
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

          const accounts = await ethereumProvider.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          setProvider(ethersProvider);
          setContract(tweetContract);

          // Load deleted tweets for this account
          const deleted = getDeletedTweets();
          setDeletedTweets(deleted);

          // Load existing tweets
          const allTweets = await tweetContract.getAllTweets();

          // For each tweet, also fetch its comments
          const formattedTweets = await Promise.all(
            allTweets.map(async (tweet, index) => {
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
          const visibleTweets = formattedTweets.filter(
            (tweet) => !deleted.includes(tweet.id)
          );

          setTweets(visibleTweets);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.log("Please install MetaMask!");
      }
    };
    connectToMetamask();
  }, [account]);

  const likeTweet = async (tweetId) => {
    try {
      const tx = await contract.likeTweet(tweetId);
      await tx.wait();
      alert("Tweet liked successfully!");

      // Update like count locally
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId
            ? { ...tweet, likeCount: tweet.likeCount + 1 }
            : tweet
        )
      );
    } catch (err) {
      console.error("Failed to like tweet:", err);
    }
  };

  const commentOnTweet = async (tweetId) => {
    if (!commentContent) return;
    try {
      const tx = await contract.commentOnTweet(tweetId, commentContent);
      await tx.wait();
      alert("Comment added successfully!");
      setCommentContent("");

      // Reload comments for the tweet after successful submission
      const comments = await contract.getComments(tweetId);
      const formattedComments = comments.map((comment) => ({
        content: comment.commentContent,
        commenter: comment.commenter,
        timestamp: Number(comment.timestamp),
      }));

      // Update the comments for the specific tweet
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId ? { ...tweet, comments: formattedComments } : tweet
        )
      );
    } catch (err) {
      console.error("Failed to comment on tweet:", err);
    }
  };

  const retweet = async (tweetId, content) => {
    try {
      const tx = await contract.retweet(tweetId, content);
      await tx.wait();
      alert("Retweeted successfully!");

      // Optionally, you can refresh the tweets list or update the retweet count
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId
            ? { ...tweet, retweetCount: tweet.retweetCount + 1 }
            : tweet
        )
      );
    } catch (err) {
      console.error("Failed to retweet:", err);
    }
  };

  const submitTweet = async (e) => {
    e.preventDefault();
    if (!tweetContent || !contract) return;

    try {
      const tx = await contract.postTweet(tweetContent);
      await tx.wait();

      const newTweet = {
        id: tweets.length, // Assign a new unique identifier based on current length
        content: tweetContent,
        author: account,
        timestamp: Math.floor(Date.now() / 1000),
        likeCount: 0,
        retweetCount: 0,
        comments: [], // No comments initially
      };
      setTweets([...tweets, newTweet]);
      setTweetContent("");
    } catch (err) {
      console.error("Failed to post tweet:", err);
    }
  };

  const handleDeleteTweet = (tweetId) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      deleteTweet(tweetId);
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white text-black flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">Decentralized Tweet App</h1>

        <button
          type="button"
          onClick={async () => {
            if (provider) {
              const accounts = await provider.send("eth_requestAccounts", []);
              setAccount(accounts[0]);
            }
          }}
          className="w-40 h-10 mb-6 bg-blue-500 hover:bg-blue-400 text-white rounded-md"
        >
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect to MetaMask"}
        </button>

        <form
          onSubmit={submitTweet}
          className="w-full max-w-xl p-6 bg-white rounded-md shadow-md"
        >
          <div className="flex items-center mb-4">
            <img
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <textarea
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              className="w-full h-24 p-3 bg-gray-200 text-black rounded-md outline-none focus:ring-2 ring-blue-500"
              placeholder="What's happening?"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md"
          >
            Tweet
          </button>
        </form>

        <div className="w-full max-w-xl mt-10 space-y-6">
          {tweets.length === 0 ? (
            <p className="text-center text-gray-400">
              No tweets yet. Be the first to tweet!
            </p>
          ) : (
            tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="p-6 bg-white rounded-md shadow-md flex items-start space-x-4"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW93PUZFo9D29sQGbcmQy5iX-hMNqsxPNcrw&s"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">
                      {tweet.author.slice(0, 6)}...{tweet.author.slice(-4)}
                    </p>
                    <button
                      onClick={() => handleDeleteTweet(tweet.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(tweet.timestamp * 1000).toLocaleString()}
                  </p>
                  <p className="text-base mt-2">{tweet.content}</p>
                  <div className="mt-3 flex space-x-4 text-gray-600">
                    <span
                      className="cursor-pointer"
                      onClick={() => likeTweet(tweet.id)}
                    >
                      ❤️ {tweet.likeCount}
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => retweet(tweet.id, tweet.content)}
                    >
                      🔗 Retweet
                    </span>
                    <span className="cursor-pointer">💬 Comment</span>
                  </div>

                  {/* Display comments for the tweet */}
                  {tweet.comments && tweet.comments.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold">Comments</h3>
                      {tweet.comments.map((comment, idx) => (
                        <div key={idx} className="mt-2">
                          <p className="text-sm">
                            {comment.commenter.slice(0, 6)}...
                            {comment.commenter.slice(-4)}: {comment.content}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(comment.timestamp * 1000).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-2">
                    <input
                      type="text"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Write a comment"
                      className="w-full p-2 bg-gray-200 rounded-md"
                    />
                    <button
                      onClick={() => commentOnTweet(tweet.id)}
                      className="bg-blue-500 text-white p-2 rounded-md mt-2"
                    >
                      Submit Comment
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;

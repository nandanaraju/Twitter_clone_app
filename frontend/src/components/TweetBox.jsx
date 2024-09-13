import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from '../scdata/TweetContract.json'; // TweetContract ABI
import { TwitterModuleTweet } from '../scdata/deployed_addresses.json'; // Contract address

function App() {
  const [tweetContent, setTweetContent] = useState('');
  const [tweets, setTweets] = useState([]);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  // Connect to MetaMask
  useEffect(() => {
    const connectToMetamask = async () => {
      const ethereumProvider = window.ethereum;
      if (ethereumProvider) {
        try {
          const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
          const signer = await ethersProvider.getSigner();
          const tweetContract = new ethers.Contract(TwitterModuleTweet, abi, signer);

          const accounts = await ethereumProvider.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
          setProvider(ethersProvider);
          setContract(tweetContract);

          // Load existing tweets
          const allTweets = await tweetContract.getAllTweets();

          // Convert BigInt (timestamp) to number and format tweets
          const formattedTweets = allTweets.map(tweet => ({
            content: tweet.content,
            author: tweet.author,
            timestamp: Number(tweet.timestamp), // Convert BigInt to number
          }));

          setTweets(formattedTweets);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };
    connectToMetamask();
  }, []);

  // Submit tweet
  const submitTweet = async (e) => {
    e.preventDefault();
    if (!tweetContent || !contract) return;

    try {
      const tx = await contract.postTweet(tweetContent);
      await tx.wait();

      // Update tweets after successful transaction
      const newTweet = {
        content: tweetContent,
        author: account,
        timestamp: Math.floor(Date.now() / 1000), // Get Unix timestamp in seconds
      };
      setTweets([...tweets, newTweet]);
      setTweetContent('');
    } catch (err) {
      console.error('Failed to post tweet:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center ">
      <h1 className="text-4xl font-bold mb-6">Decentralized Tweet App</h1>

      <button
        type="button"
        onClick={async () => {
          if (provider) {
            const accounts = await provider.send('eth_requestAccounts', []);
            setAccount(accounts[0]);
          }
        }}
        className="w-40 h-10 mb-6 bg-blue-500 hover:bg-blue-400 text-white rounded-md"
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect to MetaMask'}
      </button>

      <form onSubmit={submitTweet} className="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
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
          <p className="text-center text-gray-400">No tweets yet. Be the first to tweet!</p>
        ) : (
          tweets.map((tweet, index) => (
            <div key={index} className="p-6 bg-white rounded-md shadow-md flex items-start space-x-4">
              <img
                src={`https://www.gravatar.com/avatar/${tweet.author}?d=identicon`}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="text-lg font-bold">{tweet.author.slice(0, 6)}...{tweet.author.slice(-4)}</p>
                <p className="text-sm text-gray-400">{new Date(tweet.timestamp * 1000).toLocaleString()}</p>
                <p className="text-base mt-2">{tweet.content}</p>
                <div className="mt-3 flex space-x-4 text-gray-600">
                  {/* Add some icons for user interactions */}
                  <span className="cursor-pointer">💬</span>
                  <span className="cursor-pointer">❤️</span>
                  <span className="cursor-pointer">🔗</span>
                  <span className="cursor-pointer">🗑️</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

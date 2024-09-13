// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TweetContract {
    struct Tweet {
        string content;
        address author;
        uint256 timestamp;
    }

    Tweet[] public tweets;

    event NewTweet(string content, address indexed author, uint256 timestamp);

    function postTweet(string memory content) public {
        Tweet memory newTweet = Tweet({
            content: content,
            author: msg.sender,
            timestamp: block.timestamp
        });

        tweets.push(newTweet);
        emit NewTweet(content, msg.sender, block.timestamp);
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        return tweets;
    }
}

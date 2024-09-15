// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TweetContract {
    struct Tweet {
        string content;
        address author;
        uint256 timestamp;
        uint256 likeCount;
        uint256 retweetCount;
    }

    struct Comment {
        string commentContent;
        address commenter;
        uint256 timestamp;
    }

    Tweet[] public tweets;
    mapping(uint256 => address[]) public tweetLikes; // Track users who liked a specific tweet
    mapping(uint256 => Comment[]) public tweetComments; // Track comments on each tweet

    event NewTweet(string content, address indexed author, uint256 timestamp);
    event NewLike(uint256 tweetId, address indexed user);
    event NewComment(uint256 tweetId, string commentContent, address indexed commenter, uint256 timestamp);
    event NewRetweet(uint256 tweetId, address indexed retweeter, string content, uint256 timestamp);

    function postTweet(string memory content) public {
        Tweet memory newTweet = Tweet({
            content: content,
            author: msg.sender,
            timestamp: block.timestamp,
            likeCount: 0,
            retweetCount: 0
        });

        tweets.push(newTweet);
        emit NewTweet(content, msg.sender, block.timestamp);
    }

    function likeTweet(uint256 tweetId) public {
        require(tweetId < tweets.length, "Invalid tweet ID");
        tweetLikes[tweetId].push(msg.sender);
        tweets[tweetId].likeCount++;
        emit NewLike(tweetId, msg.sender);
    }

    function commentOnTweet(uint256 tweetId, string memory commentContent) public {
        require(tweetId < tweets.length, "Invalid tweet ID");

        Comment memory newComment = Comment({
            commentContent: commentContent,
            commenter: msg.sender,
            timestamp: block.timestamp
        });

        tweetComments[tweetId].push(newComment);
        emit NewComment(tweetId, commentContent, msg.sender, block.timestamp);
    }

    function retweet(uint256 tweetId, string memory newContent) public {
        require(tweetId < tweets.length, "Invalid tweet ID");

        Tweet memory newTweet = Tweet({
            content: newContent,
            author: msg.sender,
            timestamp: block.timestamp,
            likeCount: 0,
            retweetCount: 0
        });

        tweets.push(newTweet);
        tweets[tweetId].retweetCount++;
        emit NewRetweet(tweetId, msg.sender, newContent, block.timestamp);
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        return tweets;
    }

    function getComments(uint256 tweetId) public view returns (Comment[] memory) {
        return tweetComments[tweetId];
    }

    function getLikes(uint256 tweetId) public view returns (address[] memory) {
        return tweetLikes[tweetId];
    }
}

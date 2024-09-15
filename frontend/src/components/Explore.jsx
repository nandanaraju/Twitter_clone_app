import React from "react";
import { FaComment, FaRetweet, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

function Explore() {
  // Dummy data for the posts
  const posts = [
    {
      id: 1,
      username: "Explore",
      handle: "@Explorer",
      date: "Aug 8, 2017",
      text: "If pioneering @NASA mathematician Katherine Johnson is not already your hero, remedy that now",
      image:
        "https://pbs.twimg.com/media/CqkhQRQWcAA4okH?format=jpg&name=small",
      link: "https://explore.themarginalian.org/post/149381313618/when-katherine-began-at-nasa-she-and-her-cohorts?utm_content=buffer10232&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer",
      comments: 1,
      retweets: 48,
      likes: 120,
    },
    {
      id: 2,
      username: "Explore",
      handle: "@Explorer",
      date: "May 28, 2017",
      text: "Maya Angelou died 3 years ago today and once wrote this beautiful letter of life-advice to her younger self",
      image:
        "https://pbs.twimg.com/media/DA61ok_W0AAGofE?format=jpg&name=small",
      link: "https://www.themarginalian.org/2014/07/01/maya-angelous-letter-to-her-younger-self/",
      comments: 4,
      retweets: 178,
      likes: 268,
    },
    // Add more posts as needed
  ];

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-white p-4 rounded-lg shadow-md space-y-4"
          >
            {/* Post Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src="https://pbs.twimg.com/profile_images/2170469012/twitter_avatar_r_400x400.png"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="font-bold">{post.username}</h2>
                  <p className="text-sm text-gray-500">
                    {post.handle} • {post.date}
                  </p>
                </div>
              </div>
              <BsThreeDots className="text-gray-500" />
            </div>

            {/* Post Content */}
            <div>
              <p className="text-lg">{post.text}</p>
              <a
                href={post.link}
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.link}
              </a>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="w-full">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* Interaction Buttons */}
            <div className="flex justify-between text-gray-500">
              <div className="flex items-center space-x-1">
                <FaComment />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaRetweet />
                <span>{post.retweets}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaHeart />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;

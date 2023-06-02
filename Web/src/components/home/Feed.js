import React from "react";
import "../../styles/home/Feed.css";
import TweetBox from "../../components/tweet/TweetBox.js";
import GetFollowingTweets from "../../components/tweet/FollowingTweets.jsx";
import FollowingTweetsCopy from "../../components/tweet/FollowingTweetsCopy.jsx"; 

function Feed() {

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />
      <FollowingTweetsCopy/>
    </div>
  );
}

export default Feed;

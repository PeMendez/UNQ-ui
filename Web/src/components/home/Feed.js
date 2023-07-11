import React from "react";
import "../../styles/home/Feed.css";
import TweetBox from "../../components/tweet/TweetBox.js";
import FollowingTweets from "../../components/tweet/FollowingTweets.jsx"; 

const Feed = () => {

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />
      <FollowingTweets/>
    </div>
  );
}

export default Feed;

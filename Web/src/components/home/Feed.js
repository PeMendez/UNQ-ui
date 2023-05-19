import React from "react";
import "../../styles/home/Feed.css";
import TweetBox from "../../components/tweet/TweetBox.js";
import GetFollowingTweets from "../../components/tweet/FollowingTweets.jsx";

function Feed() {

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />
      <GetFollowingTweets/>
    </div>
  );
}

export default Feed;
